const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name nameEn price images"
    );

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.json(cart);
  } catch (error) {
    console.error("❌ Get cart error:", error);
    res.status(500).json({ message: "Lỗi khi lấy giỏ hàng" });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        userId,
        items: [
          {
            productId: product._id,
            quantity,
            price: product.price,
            name: product.name,
            nameEn: product.nameEn,
            images: product.images,
          },
        ],
      });
    } else {
      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({
          productId: product._id,
          quantity,
          price: product.price,
          name: product.name,
          nameEn: product.nameEn,
          images: product.images,
        });
      }

      await cart.save();
    }

    await cart.populate("items.productId", "name nameEn price images");

    res.json(cart);
  } catch (error) {
    console.error("❌ Add to cart error:", error);
    res.status(500).json({ message: "Lỗi khi thêm vào giỏ hàng" });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: "Số lượng không hợp lệ" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    if (quantity === 0) {
      // Remove item
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      // Update quantity
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        return res
          .status(404)
          .json({ message: "Sản phẩm không có trong giỏ hàng" });
      }
    }

    await cart.save();
    await cart.populate("items.productId", "name nameEn price images");

    res.json(cart);
  } catch (error) {
    console.error("❌ Update cart error:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật giỏ hàng" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.productId", "name nameEn price images");

    res.json(cart);
  } catch (error) {
    console.error("❌ Remove from cart error:", error);
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm khỏi giỏ hàng" });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
    }

    cart.items = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error("❌ Clear cart error:", error);
    res.status(500).json({ message: "Lỗi khi xóa giỏ hàng" });
  }
};

// Sync local cart to database (when user logs in)
exports.syncCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    // Merge local cart with server cart
    for (const localItem of items) {
      const product = await Product.findById(localItem._id);
      if (!product) continue;

      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === localItem._id
      );

      if (existingItemIndex > -1) {
        // Update quantity (add local quantity to server quantity)
        cart.items[existingItemIndex].quantity += localItem.quantity;
      } else {
        // Add new item
        cart.items.push({
          productId: product._id,
          quantity: localItem.quantity,
          price: product.price,
          name: product.name,
          nameEn: product.nameEn,
          images: product.images,
        });
      }
    }

    await cart.save();
    await cart.populate("items.productId", "name nameEn price images");

    res.json(cart);
  } catch (error) {
    console.error("❌ Sync cart error:", error);
    res.status(500).json({ message: "Lỗi khi đồng bộ giỏ hàng" });
  }
};
