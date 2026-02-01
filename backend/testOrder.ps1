# Test Order Creation with Email

# Create test order
$orderData = @{
    customerInfo = @{
        fullName = "Nguyen Van Test"
        email = "vtu21102000@gmail.com"
        phone = "0123456789"
        address = "123 Duong Test"
        ward = "Phuong Test"
        district = "Quan Test"
        city = "Ha Noi"
        notes = "Day la don hang test de kiem tra gui email"
    }
    items = @(
        @{
            productId = "test123"
            productName = "San pham test 1"
            quantity = 2
            price = 500000
            image = "https://via.placeholder.com/150"
        },
        @{
            productId = "test456"
            productName = "San pham test 2"
            quantity = 1
            price = 300000
            image = "https://via.placeholder.com/150"
        }
    )
    subtotal = 1300000
    shippingFee = 30000
    total = 1330000
    paymentMethod = "cod"
    status = "pending"
    language = "vi"
} | ConvertTo-Json -Depth 10

Write-Host "Testing Order Creation with Email..." -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/orders" -Method Post -Body $orderData -ContentType "application/json"
    
    Write-Host "Order created successfully!" -ForegroundColor Green
    Write-Host "Order Number: $($response.orderNumber)" -ForegroundColor Yellow
    Write-Host "Total: $($response.total) VND" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Email should be sent to: vtu21102000@gmail.com" -ForegroundColor Cyan
    Write-Host "Please check your email inbox (and spam folder)" -ForegroundColor Cyan
} catch {
    Write-Host "Error creating order:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
