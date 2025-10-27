<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Eventmie Pro 3.0 License Verification</title>

<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Styles -->
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        background: linear-gradient(135deg, #2276FF 0%, #161920 100%);
        color: #2d3748;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 400;
        height: 100vh;
        overflow-x: hidden;
    }

    .container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .license-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        padding: 60px 50px;
        max-width: 500px;
        width: 100%;
        text-align: center;
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .license-card::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #2276FF, #161920, #2276FF, #161920);
        border-radius: 22px;
        z-index: -1;
        opacity: 0.3;
    }

    .logo-section {
        margin-bottom: 40px;
    }

    .logo-icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    .logo-icon i {
        font-size: 36px;
        color: white;
    }

    .title {
        font-size: 28px;
        font-weight: 700;
        color: #1a202c;
        margin-bottom: 8px;
        letter-spacing: -0.5px;
    }

    .subtitle {
        font-size: 16px;
        color: #718096;
        margin-bottom: 40px;
        font-weight: 400;
        line-height: 1.5;
    }

    .license-form {
        margin-bottom: 30px;
    }

    .input-group {
        position: relative;
        margin-bottom: 25px;
    }

    .license-input {
        width: 100%;
        padding: 18px 20px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 500;
        color: #2d3748;
        background: #f7fafc;
        transition: all 0.3s ease;
        outline: none;
    }

    .license-input:focus {
        border-color: #2276FF;
        background: white;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .license-input::placeholder {
        color: #a0aec0;
        font-weight: 400;
    }

    .verify-btn {
        width: 100%;
        padding: 18px 20px;
        background: linear-gradient(135deg, #2276FF, #161920);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .verify-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    }

    .verify-btn:active {
        transform: translateY(0);
    }

    .verify-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .security-info {
        background: #f7fafc;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 20px;
        margin-top: 30px;
    }

    .security-title {
        font-size: 14px;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 8px;
    }

    .security-title i {
        color: #48bb78;
    }

    .security-text {
        font-size: 13px;
        color: #718096;
        line-height: 1.5;
    }

    .footer-links {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #e2e8f0;
    }

    .footer-links a {
        color: #2276FF;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        margin: 0 15px;
        transition: color 0.3s ease;
    }

    .footer-links a:hover {
        color: #161920;
    }

    .loading {
        display: none;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #2276FF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .error-message {
        background: #fed7d7;
        border: 1px solid #feb2b2;
        color: #c53030;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        margin-top: 15px;
        display: none;
    }

    .success-message {
        background: #c6f6d5;
        border: 1px solid #9ae6b4;
        color: #22543d;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        margin-top: 15px;
        display: none;
    }

    @media (max-width: 768px) {
        .license-card {
            padding: 40px 30px;
            margin: 20px;
        }
        
        .title {
            font-size: 24px;
        }
        
        .logo-icon {
            width: 60px;
            height: 60px;
        }
        
        .logo-icon i {
            font-size: 28px;
        }
    }
</style>
</head>
<body>

<div class="container">
    <div class="license-card">
        <div class="logo-section">
            <div class="logo-icon">
                <img src="{{ asset('eventmie-pro-logo.png') }}" alt="Eventmie Pro" style="width: 100%;">
            </div>
            <h1 class="title">Eventmie 3.0 Pro</h1>
            <p class="subtitle">License Verification Required</p>
        </div>

        <div class="license-form">
            <div class="input-group">
                <input type="text" 
                       id="license" 
                       class="license-input" 
                       placeholder="Enter your license key or purchase code" 
                       autocomplete="off" />
            </div>
            
            <button type="button" id="verify" class="verify-btn">
                <i class="fas fa-shield-alt"></i> Verify License
            </button>
            
            {{-- <div class="loading" id="loading">
                <div class="spinner"></div>
                <span>Verifying license...</span>
            </div> --}}
            
            <div class="error-message" id="error-message"></div>
            <div class="success-message" id="success-message"></div>
        </div>

        <div class="security-info">
            <div class="security-title">
                <i class="fas fa-lock"></i>
                Secure Verification
            </div>
            <p class="security-text">
                Your license key is verified securely through our servers. 
                This process ensures you have a valid Eventmie 3.0 Pro license 
                and enables all premium features.
            </p>
        </div>

        <div class="footer-links">
            <a href="https://classiebit.com/contact" target="_blank">Need Help?</a>
            <a href="https://classiebit.com/privacy" target="_blank">Privacy Policy</a>
            <a href="https://classiebit.com/terms" target="_blank">Terms of Service</a>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>var s_host = "{{$_SERVER['REMOTE_ADDR']}}",base_url = "{{url('52cab7070ba5124895a63a3703f66893232')}}";</script>
<script src="{{ asset('js/eventmie-pro.js') }}"></script>

</body>
</html>
