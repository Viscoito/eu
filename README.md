# Portfolio (GitHub Pages)

Este projeto é um site estático (HTML/CSS/JS) pronto para publicar no **GitHub Pages**.

## Deploy automático (recomendado)

1. Suba este repositório no GitHub.
2. Vá em **Settings → Pages**.
3. Em **Build and deployment**, escolha **Source: GitHub Actions**.
4. Faça push na branch `main` (ou na branch padrão do repo).
5. Aguarde o workflow finalizar em **Actions**.
6. Seu site ficará disponível em:
   - `https://SEU_USUARIO.github.io/`
   - ou `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/` (se não for repo de usuário)

## Observação importante sobre caminhos

Como este projeto usa caminhos relativos (`styles.css`, `script.js`), ele funciona tanto em:
- domínio de usuário (`SEU_USUARIO.github.io`), quanto
- projeto (`SEU_USUARIO.github.io/NOME_DO_REPOSITORIO`).

## Rodar localmente

```bash
python3 -m http.server 4173
```

Depois abra: `http://localhost:4173`
