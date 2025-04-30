CREATE DATABASE cosmeticos;

\c cosmeticos;

CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    marca_id INTEGER REFERENCES marcas(id)
);

INSERT INTO marcas (nome) VALUES
    ('Rare Beauty'),
    ('Laura Mercier'),
    ('NARS'),
    ('Charlotte Tilbury'),
    ('Fenty Beauty'),
    ('Lancôme'),
    ('Benefit Cosmetics'),
    ('e.l.f. Cosmetics'),
    ('Kiko Milano');

INSERT INTO produtos (nome, categoria, preco, marca_id) VALUES
    ('Rare Beauty Liquid Touch Weightless Foundation', 'Base', 229.00, 1),
    ('Laura Mercier Translucent Loose Setting Powder', 'Pó', 239.00, 2),
    ('NARS Radiant Creamy Concealer', 'Corretivo', 190.00, 3),
    ('Charlotte Tilbury Airbrush Flawless Finish Setting Powder', 'Pó', 350.00, 4),
    ('Fenty Beauty Pro Filt\ r Soft Matte Longwear Foundation', 'Base', 190.00, 5),
    ('Lancôme Advanced Génifique Serum', 'Skincare', 520.00, 6),
    ('Benefit Cosmetics Hoola Matte Bronzer', 'Bronzer', 180.00, 7),
    ('e.l.f. Cosmetics Hydrating Camo Concealer', 'Corretivo', 120.00, 8),
    ('Kiko Milano Sublime Youth Day Cream', 'Skincare', 150.00, 9),