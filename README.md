# VÉRTICE — Tema Shopify

Tema custom (Online Store 2.0 / Liquid), construído do zero, inspirado no estilo de temas premium
tipo "Concept": mobile-first, header fixo (sticky), banner com slideshow, grade de produtos,
selos de confiança e sacola em drawer lateral.

## Estrutura

```
vertice-theme/
├── assets/           # theme.css e theme.js
├── config/           # settings_schema.json (opções do editor) e settings_data.json (valores padrão)
├── layout/           # theme.liquid (esqueleto de toda página)
├── sections/         # blocos reutilizáveis (header, footer, hero, produto, coleção, carrinho...)
├── snippets/         # partes pequenas reaproveitadas (ícones, card de produto)
└── templates/        # define quais seções aparecem em cada tipo de página
```

## 1. Subir para o GitHub

Dentro da pasta `vertice-theme`:

```bash
git init
git add .
git commit -m "Tema inicial VÉRTICE"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/vertice-theme.git
git push -u origin main
```

Crie o repositório vazio no GitHub antes (github.com → New repository) e troque a URL acima pela dele.

## 2. Conectar o repositório na Shopify

1. No admin da Shopify: **Loja Online → Temas**.
2. Clique em **Adicionar tema → Conectar do GitHub**.
3. Na primeira vez, a Shopify vai pedir para instalar o **Shopify GitHub app** na sua conta/organização do GitHub — autorize o acesso ao repositório `vertice-theme`.
4. Selecione o repositório e a branch `main`.
5. A Shopify importa o tema. Ele aparece em "Temas" como não publicado — dá pra pré-visualizar antes de publicar.

A partir daí, qualquer commit que você (ou eu) fizer na branch conectada é refletido automaticamente no tema dentro da Shopify.

## 3. Testar localmente antes de subir (opcional, mas recomendado)

Se tiver o [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) instalado:

```bash
shopify theme dev --store=sua-loja.myshopify.com
```

Isso abre uma prévia local ligada à sua loja de verdade, sem precisar publicar nada.

## 4. O que já está pronto

- Header sticky com logo/slogan, menu, busca, conta e ícone da sacola com contador.
- Menu mobile em drawer lateral.
- Banner principal com múltiplos slides, autoplay configurável, setas e dots.
- Selos de confiança (blocos editáveis: ícone, título, texto).
- Grade de produtos (coleção em destaque na home + página de coleção com paginação).
- Página de produto com galeria de miniaturas, seletor de variante (atualiza preço/imagem via JS) e adicionar à sacola via AJAX.
- Drawer da sacola que abre automaticamente ao adicionar um produto.
- Rodapé com sobre, menu institucional e formulário de newsletter.
- Página genérica, 404 e busca.
- Marca VÉRTICE / "Escolhas inteligentes." já como valores padrão no editor de tema (você troca tudo pelo Editor de Temas, sem mexer em código).

## 5. O que falta você ajustar

- **Conteúdo real**: fotos, textos, produtos e coleções — tudo isso é cadastrado no admin da Shopify, não no código.
- **Menus**: crie o menu "main-menu" (Navegação) no admin para ele aparecer no header, e "footer" para o rodapé.
- **Cores/fontes**: já são editáveis via **Personalizar tema** no admin, sem precisar mexer em CSS.
- **Testes reais**: eu não tenho como abrir uma prévia da Shopify aqui — depois de conectar o repositório, teste o fluxo completo (adicionar ao carrinho, trocar variante, finalizar compra) na prévia antes de publicar.
- Esse é um ponto de partida sólido, não um clone do tema pago — o código é 100% original e livre para você editar como quiser.
