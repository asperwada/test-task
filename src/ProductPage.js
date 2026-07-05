import React, { useState, useEffect } from 'react';
import { furniture } from './assortment.js';
import './product.css';

function ProductPage({ productId, onBack }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = furniture.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  if (!product) {
    return <div className="loading">Загрузка...</div>;
  }

  const discountedPrice = product.price * (1 - product.discount / 100);
  const formattedPrice = discountedPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formattedOriginalPrice = product.price.toLocaleString('ru-RU');

  return (
      <div className="app">
        <header className="product-header">
          <h1>✦ COSMIC FURNITURE ✦</h1>
          <nav>
            <button
                className="back-button"
                onClick={onBack}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontWeight: 'inherit'
                }}
            >
              ← Вернуться в каталог
            </button>
          </nav>
        </header>

        <main className="product-main">
          <div className="product-container">
            <div className="product-preview-section">
              <img
                  src={product.preview}
                  alt={product.name}
                  className="product-large-preview"
              />
            </div>

            <div className="product-details-section">
              <div className="details-header">
                <h1 className="product-title">{product.name}</h1>
                {product.discount > 0 && (
                    <span className="discount-badge-large">-{product.discount}%</span>
                )}
              </div>

              <div className="price-section">
                <div className="price-current-large">
                  {formattedPrice} ₽
                </div>
                {product.discount > 0 && (
                    <div className="price-info">
                  <span className="price-original-large">
                    {formattedOriginalPrice} ₽
                  </span>
                      <span className="savings">
                    Экономия: {(product.price - discountedPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽
                  </span>
                    </div>
                )}
              </div>

              <div className="description-section">
                <h3>Описание</h3>
                <p className="full-description">{product.description}</p>
              </div>

              <div className="action-buttons">
                <button className="btn-primary">
                  🛒 Добавить в корзину
                </button>
                <button className="btn-secondary">
                  ❤️ Добавить в избранное
                </button>
              </div>

              <div className="product-features">
                <h3>Характеристики</h3>
                <ul>
                  <li>Премиум материалы</li>
                  <li>Эргономичный дизайн</li>
                  <li>Гарантия 2 года</li>
                  <li>Бесплатная доставка</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <p>&copy; 2024 Cosmic Furniture. Все права защищены.</p>
          <p>✦ Мебель премиум-класса из космоса для вашего дома ✦</p>
        </footer>
      </div>
  );
}

export default ProductPage;