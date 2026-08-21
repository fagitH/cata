import React, { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { jsPDF } from 'jspdf';
import { api, ASSET_BASE_URL } from '../utils/api';

GlobalWorkerOptions.workerSrc = workerSrc;

const getPdfUrl = (path) => {
	if (!path) return '';
	return /^https?:\/\//i.test(path) ? path : `${ASSET_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

const getAssetUrl = (path) => {
	if (!path) return '';
	return /^https?:\/\//i.test(path) ? path : `${ASSET_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

// Static uploads from the PHP development server do not include CORS headers.
// Use Vite's same-origin proxy when developing so fetch() can build the PDF.
const getDownloadUrl = (path) => {
	if (!path) return '';
	if (import.meta.env.DEV && !/^https?:\/\//i.test(path)) {
		return path.startsWith('/') ? path : `/${path}`;
	}
	return getAssetUrl(path);
};

const getImageUrls = (newsletter) => {
	const urls = Array.isArray(newsletter.image_urls) ? newsletter.image_urls : [];
	if (urls.length > 0) return urls.map(getAssetUrl);
	return newsletter.image_url ? [getAssetUrl(newsletter.image_url)] : [];
};

const downloadAsPdf = async (newsletter) => {
	const imageUrls = (Array.isArray(newsletter.image_urls) && newsletter.image_urls.length > 0
		? newsletter.image_urls
		: newsletter.image_url ? [newsletter.image_url] : []).map(getDownloadUrl);
	if (imageUrls.length === 0) return;
	let pdf = null;

	for (const imageUrl of imageUrls) {
		const response = await fetch(imageUrl);
		if (!response.ok) {
			throw new Error(`Unable to load a newsletter page (HTTP ${response.status}).`);
		}
		const blob = await response.blob();
		if (!blob.type.startsWith('image/')) {
			throw new Error('A newsletter page is not a supported image.');
		}
		const dataUrl = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
		const image = new Image();
		image.src = dataUrl;
		await new Promise((resolve, reject) => {
			image.onload = resolve;
			image.onerror = reject;
		});
		const orientation = image.width >= image.height ? 'landscape' : 'portrait';
		if (!pdf) {
			pdf = new jsPDF({ orientation, unit: 'px', format: [image.width, image.height] });
		} else {
			pdf.addPage([image.width, image.height], orientation);
		}
		const format = blob.type === 'image/png' ? 'PNG' : 'JPEG';
		pdf.addImage(dataUrl, format, 0, 0, image.width, image.height);
	}

	pdf.save(`${newsletter.title || 'newsletter'}.pdf`);
};

function NewsletterImage({ newsletter }) {
	const canvasRef = useRef(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		let cancelled = false;
		const renderFirstPage = async () => {
			try {
				const pdf = await getDocument(getPdfUrl(newsletter.pdf_url)).promise;
				const page = await pdf.getPage(1);
				const viewport = page.getViewport({ scale: 1.5 });
				const canvas = canvasRef.current;
				if (!canvas || cancelled) return;
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
			} catch {
				if (!cancelled) setError(true);
			}
		};

		renderFirstPage();
		return () => { cancelled = true; };
	}, [newsletter.pdf_url]);

	if (error) {
		return <div className="flex items-center justify-center w-full aspect-[3/4] bg-slate-100 text-sm text-slate-500">Unable to preview newsletter</div>;
	}

	return <canvas ref={canvasRef} className="block w-full h-auto" aria-label={newsletter.title} />;
}

export default function Newsletter() {
	const [newsletters, setNewsletters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedNewsletter, setSelectedNewsletter] = useState(null);
	const [downloadError, setDownloadError] = useState('');
	const [downloadingId, setDownloadingId] = useState(null);

	useEffect(() => {
		api.get('/newsletters')
			.then((data) => setNewsletters(Array.isArray(data) ? data : []))
			.catch(() => setNewsletters([]))
			.finally(() => setLoading(false));
	}, []);

	return (
		<main className="min-h-screen px-4 py-12 bg-slate-50 sm:py-16">
			<div className="max-w-5xl mx-auto">
				<h1 className="mb-8 text-3xl font-extrabold text-slate-900 sm:text-4xl">Newsletter</h1>
				{loading ? (
					<p className="text-slate-500">Loading newsletters...</p>
				) : newsletters.length === 0 ? (
					<p className="text-slate-500">No newsletters available.</p>
				) : (
					<div className="space-y-10">
						{newsletters.map((newsletter) => {
							const imageUrls = getImageUrls(newsletter);
							return (
							<article key={newsletter.id} className="overflow-hidden bg-white border rounded-xl border-slate-200 shadow-sm">
								{imageUrls.length > 0 ? imageUrls.map((imageUrl, index) => (
									<button type="button" key={imageUrl} className="block w-full cursor-zoom-in" onClick={() => setSelectedNewsletter({ ...newsletter, selectedImage: imageUrl })}>
										<img src={imageUrl} alt={`${newsletter.title} page ${index + 1}`} className="block w-full h-auto" />
									</button>
								)) : <NewsletterImage newsletter={newsletter} />}
								<div className="flex flex-wrap items-center justify-between gap-3 p-4">
									<h2 className="text-lg font-bold text-slate-900">{newsletter.title || 'Newsletter'}</h2>
									{imageUrls.length > 0 && (
										<button type="button" disabled={downloadingId === newsletter.id} onClick={async () => { try { setDownloadError(''); setDownloadingId(newsletter.id); await downloadAsPdf(newsletter); } catch (error) { setDownloadError(error.message || 'Unable to download newsletter.'); } finally { setDownloadingId(null); } }} className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-[#0070ba] hover:bg-[#005b99] disabled:cursor-not-allowed disabled:opacity-60">{downloadingId === newsletter.id ? 'Preparing PDF...' : 'Download PDF'}</button>
									)}
								</div>
							</article>
							);
						})}
					</div>
				)}
				{downloadError && <p className="mt-4 text-sm text-red-600" role="alert">{downloadError}</p>}
			</div>
			{selectedNewsletter && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedNewsletter(null)}>
					<button type="button" aria-label="Close newsletter preview" className="absolute top-4 right-4 text-3xl text-white" onClick={() => setSelectedNewsletter(null)}>×</button>
					<img src={selectedNewsletter.selectedImage || getAssetUrl(selectedNewsletter.image_url)} alt={selectedNewsletter.title} className="max-w-full max-h-[95vh] object-contain" onClick={(event) => event.stopPropagation()} />
				</div>
			)}
		</main>
	);
}
