<?php

return [
    'acleda' => [
        'login_id' => env('ACLEDA_LOGIN_ID'),
        'password' => env('ACLEDA_PASSWORD'),
        'merchant_id' => env('ACLEDA_MERCHANT_ID'),
        'merchant_name' => env('ACLEDA_MERCHANT_NAME', 'CATAISLAMIC'),
        'signature' => env('ACLEDA_SIGNATURE'),
        'verify_ssl' => env('ACLEDA_VERIFY_SSL', true),
        'open_session_url' => env('ACLEDA_OPEN_SESSION_URL', 'https://epaymentuat.acledabank.com.kh:8443/CATAISLAMIC/XPAYConnectorServiceInterfaceImplV2/XPAYConnectorServiceInterfaceImplV2RS/openSessionV2'),
        'txn_status_url' => env('ACLEDA_TXN_STATUS_URL', 'https://epaymentuat.acledabank.com.kh/CATAISLAMIC/XPAYConnectorServiceInterfaceImplV2/XPAYConnectorServiceInterfaceImplV2RS/getTxnStatus'),
        'payment_page_url' => env('ACLEDA_PAYMENT_PAGE_URL', 'https://epaymentuat.acledabank.com.kh/CATAISLAMIC/paymentPage.jsp'),
        'frontend_url' => env('FRONTEND_URL', env('APP_URL')),
    ],
];
