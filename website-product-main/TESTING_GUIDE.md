# Shopping Cart & Checkout - Testing Guide

## Quick Start

1. **Make sure both servers are running:**

   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

2. **Test the Shopping Cart Flow:**

### Step 1: Add Product to Cart

1. Go to Products page: `http://localhost:3000/products`
2. Click on any product to view details
3. On the product detail page:
   - Adjust quantity using +/- buttons
   - Click "Add to Cart" button
   - You should see an alert: "Added to cart!"
   - Notice the cart icon in header shows the item count

### Step 2: View Cart

1. Click the cart icon in the header (top right)
2. You should see:
   - Product image and name (in current language)
   - Price per unit
   - Quantity controls (+/-)
   - Remove button
   - Order summary:
     - Subtotal
     - Shipping fee (30,000₫ or FREE if subtotal ≥ 500,000₫)
     - Total
   - "Proceed to Checkout" button

### Step 3: Modify Cart

1. Try changing quantity with +/- buttons
2. Try removing an item
3. Add more products to test the free shipping threshold

### Step 4: Checkout

1. Click "Proceed to Checkout" button
2. Fill in the checkout form:

   - **Full Name:** Nguyen Van A
   - **Email:** test@example.com
   - **Phone:** 0123456789
   - **Address:** 123 Nguyen Trai
   - **City:** Ho Chi Minh
   - **District:** District 1 (optional)
   - **Ward:** Ward 1 (optional)
   - **Notes:** Please deliver in the morning (optional)

3. Select a payment method:

   - ☐ Cash on Delivery (COD)
   - ☐ Bank Transfer
   - ☐ MoMo Wallet

4. Review order summary on the right sidebar

5. Click "Place Order" button

### Step 5: Order Confirmation

1. You should be redirected to the order success page
2. You should see:
   - Success icon (green checkmark)
   - "Order Placed Successfully!" message
   - Order details:
     - Order Number (e.g., ORD202401010001)
     - Order Date
     - Status (Pending)
     - Payment Method
     - Total Amount
   - Shipping Information (your entered details)
   - Ordered Items list
   - Two buttons:
     - "Return to Home"
     - "Continue Shopping"

### Step 6: Verify Cart is Cleared

1. Click the cart icon in header
2. Cart should be empty
3. Should show "Your cart is empty" message

## Language Switching Test

1. Click the language toggle (🌐) in header
2. Switch between English and Vietnamese
3. Verify all text changes:
   - Cart page labels
   - Checkout form labels
   - Button text
   - Product names
   - Success messages

## Form Validation Test

On the checkout page, try to submit without filling required fields:

1. Click "Place Order" without filling anything
2. You should see red error messages under each required field:
   - "Required field" for empty fields
   - "Invalid email" for wrong email format
   - "Invalid phone number" for wrong phone format

## Mobile Responsive Test

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - iPhone (375px)
   - iPad (768px)
   - Desktop (1920px)
4. Verify:
   - Cart items stack vertically on mobile
   - Checkout form is readable
   - Buttons are easily clickable
   - Order summary doesn't overlap

## Backend API Test

You can test the API directly using these endpoints:

### Create Order

```bash
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "customerInfo": {
    "fullName": "Nguyen Van A",
    "email": "test@example.com",
    "phone": "0123456789",
    "address": "123 Nguyen Trai",
    "city": "Ho Chi Minh",
    "district": "District 1",
    "ward": "Ward 1",
    "notes": "Please call before delivery"
  },
  "items": [
    {
      "productId": "YOUR_PRODUCT_ID",
      "productName": "Product Name",
      "quantity": 2,
      "price": 250000
    }
  ],
  "subtotal": 500000,
  "shippingFee": 0,
  "total": 500000,
  "paymentMethod": "cod"
}
```

### Get Order by ID

```bash
GET http://localhost:5000/api/orders/YOUR_ORDER_ID
```

### Get All Orders

```bash
GET http://localhost:5000/api/orders
```

## Common Issues & Solutions

### Issue 1: Cart icon doesn't update

**Solution:** Make sure CartProvider wraps the entire app in App.js

### Issue 2: "Product not found" error on checkout

**Solution:** Make sure MongoDB has products with the IDs in your cart

### Issue 3: Order not created

**Solution:**

- Check backend console for errors
- Verify MongoDB connection
- Check if all required fields are filled

### Issue 4: Images not showing

**Solution:** Make sure product images are uploaded to `/uploads` folder

### Issue 5: Vietnamese characters showing incorrectly

**Solution:** All Vietnamese text now uses translations - no hardcoded Vietnamese strings

## Testing Checklist

- [ ] Add single product to cart
- [ ] Add multiple products to cart
- [ ] Increase quantity in cart
- [ ] Decrease quantity in cart
- [ ] Remove product from cart
- [ ] Cart count updates in header
- [ ] Free shipping threshold works (500,000₫)
- [ ] Checkout form validation works
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Can select payment method
- [ ] Order successfully created
- [ ] Redirected to success page
- [ ] Order details displayed correctly
- [ ] Cart cleared after order
- [ ] Can continue shopping after order
- [ ] Language switch works on all pages
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Buy Now button works on product page

## Performance Verification

1. **Cart Performance:**

   - Adding 10+ items should be instant
   - Quantity updates should be smooth
   - No lag when updating cart count

2. **Checkout Performance:**

   - Form validation should be instant
   - Order submission should take < 2 seconds
   - No console errors

3. **Page Load:**
   - Cart page should load instantly (data from localStorage)
   - Order success page should load order within 1 second

## Security Notes

Currently implemented:

- ✅ Client-side form validation
- ✅ Backend data validation
- ✅ Product existence verification

For production, also implement:

- [ ] Rate limiting on order API
- [ ] CAPTCHA on checkout
- [ ] Order amount verification
- [ ] Payment verification
- [ ] User authentication for order history

## Next Features to Test (When Implemented)

- [ ] Order history page (user account)
- [ ] Order tracking
- [ ] Email notifications
- [ ] Admin order management
- [ ] Inventory tracking
- [ ] MoMo payment integration
- [ ] Discount codes
- [ ] Multiple addresses
- [ ] Wishlist

---

**Status:** ✅ All core shopping cart features are implemented and ready to test!
