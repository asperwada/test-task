import React, { useState, useMemo } from 'react';
import { furniture } from './assortment.js';
import './styles.css';
import ProductPage from './ProductPage';

function App() {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedProducts = useMemo(() => {
        const sorted = [...furniture];

        sorted.sort((a, b) => {
            let compareValue = 0;

            if (sortBy === 'name') {
                compareValue = a.name.localeCompare(b.name);
            } else if (sortBy === 'price') {
                const priceA = a.price * (1 - a.discount / 100);
                const priceB = b.price * (1 - b.discount / 100);
                compareValue = priceA - priceB;
            }

            return sortOrder === 'asc' ? compareValue : -compareValue;
        });

        return sorted;
    }, [sortBy, sortOrder]);

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
    };

    const handleBackToMenu = () => {
        setSelectedProductId(null);
    };

    const formatPrice = (price, discount) => {
        const finalPrice = price * (1 - discount / 100);
        return finalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const truncateDescription = (text, length = 200) => {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    };

    if (selectedProductId) {
        return <ProductPage productId={selectedProductId} onBack={handleBackToMenu} />;
    }

    return (
        <div className="app">
            <header>
                <h1>✦ COSMIC FURNITURE ✦</h1>
                <nav>
                    <a href="#home">Главная</a>
                    <a href="#catalog">Каталог</a>
                    <a href="#about">О нас</a>
                    <a href="#contact">Контакты</a>
                </nav>
            </header>

            <main>
                <section className="sorting-section">
                    <div className="sort-group">
                        <label htmlFor="sort-by">Сортировать по:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="name">Названию (А-Я)</option>
                            <option value="price">Цене</option>
                        </select>
                    </div>

                    <div className="sort-group">
                        <label htmlFor="sort-order">Порядок:</label>
                        <select
                            id="sort-order"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>
                        </select>
                    </div>
                </section>

                <section className="products-container">
                    {sortedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img
                                src={product.preview}
                                alt={product.name}
                                className="product-preview"
                            />
                            <div className="product-info">
                                <div className="product-header">
                                    <h3 className="product-name">{product.name}</h3>
                                    {product.discount > 0 && (
                                        <span className="discount-badge">-{product.discount}%</span>
                                    )}
                                </div>

                                <div className="product-price">
                          <span className="price-current">
                            {formatPrice(product.price, product.discount)} ₽
                          </span>
                                    {product.discount > 0 && (
                                        <span className="price-original">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </span>
                                    )}
                                </div>

                                <button className="product-button">
                                    Подробнее →
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <footer>
                <p>&copy; 2024 Cosmic Furniture. Все права защищены.</p>
                <p>✦ Мебель премиум-класса из космоса для вашего дома ✦</p>
                <div className="footer-links">
                    <a href="#privacy">Политика конфиденциальности</a>
                    <a href="#terms">Условия использования</a>
                    <a href="#delivery">Доставка и возврат</a>
                </div>
            </footer>
        </div>
    );
}

export default App;