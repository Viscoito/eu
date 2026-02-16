# Portfólio VRM (Multipage)

Site estático multipágina com conteúdo orientado a dados JSON.

## Estrutura

- `index.html`: Home com previews automáticos.
- `about.html`: Apresentação.
- `projects.html`: Projetos carregados de JSON.
- `gallery.html`: Artes carregadas de JSON.
- `diary.html`: Entradas cronológicas do diário.
- `photos.html`: Galeria de fotos com metadados e tags.
- `commissions.html`: Pacotes, processo e FAQ de comissões.
- `vtuber.html`: Demonstração do modelo Live2D centralizado.
- `contact.html`: Canais de contato.

## Como adicionar conteúdo (fácil)

### Diário
Edite `data/diary.json` e adicione novos objetos em `entries`.
Campos esperados:
- `date` (`YYYY-MM-DD`)
- `title`
- `summary`
- `url`
- `tags` (array)

### Fotos
Edite `data/photos.json` e adicione novos objetos em `photos`.
Campos esperados:
- `date` (`YYYY-MM-DD`)
- `location` (opcional)
- `caption`
- `theme`
- `tags` (array)
- `image` (URL)

### Projetos, Artes e Comissões
Edite `data/site-content.json`:
- `projects`: cards da página de projetos
- `artworks`: itens da galeria de artes
- `commissions`: pacotes, processo e FAQ

## Rodar localmente

```bash
python -m http.server 4173
```

Abra: `http://localhost:4173`.
