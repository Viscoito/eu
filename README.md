# Portfolio (GitHub Pages)

Site estático (HTML/CSS/JS) com tema claro/escuro Catppuccin, suporte multilíngue e estrutura pronta para integração Live2D.

## Publicar no GitHub Pages (automático)

1. Suba o repositório no GitHub.
2. Acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **GitHub Actions**.
4. Faça push para `main`.
5. Aguarde workflow em **Actions**.
6. URL final:
   - `https://SEU_USUARIO.github.io/` (repo de usuário)
   - `https://SEU_USUARIO.github.io/NOME_DO_REPO/` (repo de projeto)

## Rodar localmente

```bash
python3 -m http.server 4173
```

## Preparar Live2D (próxima fase)

1. Crie a pasta `assets/live2d/`.
2. Adicione o arquivo `model.model3.json` e os assets gerados pelo Cubism.
3. Ao abrir o site, a seção VTuber detecta automaticamente se o model JSON existe.

> Observação: durante esta execução, acesso direto ao repositório externo `IuriGuerreiro/Live2D-web-Playground` retornou HTTP 403, então o projeto foi preparado com fallback local para você plugar os arquivos do Cubism diretamente.
