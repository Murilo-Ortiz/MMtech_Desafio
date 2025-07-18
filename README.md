# 👤 Gerenciador de Contatos - Desafio MMTech

Este projeto é uma solução Full-Stack para o desafio técnico da MMTech, implementando um sistema de gerenciamento de contatos. A arquitetura consiste em um frontend desacoplado em React e uma API RESTful em Node.js com Express, utilizando autenticação via JWT. O ambiente é totalmente containerizado com Docker e orquestrado via Docker Compose para garantir consistência e portabilidade.



---

## Funcionalidades

- **Autenticação Segura:** Endpoint de login com geração de JSON Web Tokens (JWT) para acesso seguro às rotas da API.
- **Gerenciamento de Contatos (CRUD):** Operações completas para criar, ler, atualizar e deletar contatos, com os dados persistidos em um banco de dados NeDB.
- **API RESTful:** Backend construído com Node.js e Express, seguindo os princípios REST para uma comunicação clara e padronizada.
- **Frontend Reativo:** Interface de usuário desenvolvida em React, proporcionando uma experiência de uso dinâmica e responsiva.
- **Ambiente Dockerizado:** Aplicação totalmente containerizada com Docker e Docker Compose, isolando os serviços de frontend (Nginx + React) e backend (Node.js) para garantir consistência e facilidade de execução.

## Tecnologias Utilizadas
<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx"/>
  <img src="https://img.shields.io/badge/NeDB-A8A8A8?style=for-the-badge" alt="NeDB"/>
</p>

- **Frontend:** React (com Vite)
- **Backend:** Node.js, Express.js
- **Banco de Dados:** NeDB (baseado em arquivo)
- **Autenticação:** JWT (JSON Web Tokens)
- **Servidor do Frontend:** Nginx
- **Containerização:** Docker, Docker Compose

## 📂 Estrutura do Projeto

```MMTech_Desafio
├── backend
│   ├── Dockerfile
│   ├── config
│   │   └── database.js
│   ├── data.db
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── src
│   │   ├── authController.js
│   │   ├── authMidlleware.js
│   │   ├── authRoutes.js
│   │   ├── controller.js
│   │   └── routes.js
│   └── users.db
├── data.db
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── nginx.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── confirmationModel.jsx
│   │   │   ├── contactCard.jsx
│   │   │   ├── contactDetailModal.jsx
│   │   │   ├── contactForm.jsx
│   │   │   └── contactList.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── ContactPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── services
│   │       └── api.js
│   └── vite.config.js
└── users.db
```


## Como Executar o Projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/en/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Passos para Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Murilo-Ortiz/MMtech_Desafio.git
    cd MMtech_Desafio
    ```

2.  **Crie o arquivo de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione a sua chave secreta para JWT:
    ```
    JWT_SECRET="sua_chave_secreta_aqui"
    ```

3.  **Inicie os contêineres:**
    Este comando irá construir as imagens e iniciar os serviços do backend e do frontend.
    ```bash
    docker-compose up --build
    ```

4.  **Acesse a aplicação:**
    Abra o seu navegador e acesse: `http://localhost/`

## Melhorias Futuras
* Adicionar um campo de busca para filtrar contatos por nome ou e-mail.
* Substituir o Ethereal por um serviço de e-mail transacional (como SendGrid ou Mailgun) para a funcionalidade de verificação de e-mail em um ambiente real.

### 📸 Galeria

Login
<img width="1366" height="635" alt="image" src="https://github.com/user-attachments/assets/ea5b292f-4c0b-490a-a4a1-5e328c6f6a6c" /> 
Pagina de Contatos
<img width="1366" height="639" alt="image" src="https://github.com/user-attachments/assets/7a60d577-3c15-4036-8ff3-b4f61d681170" /> 
Modal de Detalhes
<img width="1359" height="636" alt="image" src="https://github.com/user-attachments/assets/48b98b74-0bf0-4409-bd9f-bd31b0d992a5" />
Tela de Registro
<img width="1364" height="638" alt="image" src="https://github.com/user-attachments/assets/bc1a327e-6a53-4e0e-b632-b8cda824ce91" />


---

---
## 👨‍💻 Desenvolvido por

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Murilo-Ortiz">
        <img src="https://avatars.githubusercontent.com/Murilo-Ortiz" width="100px;" alt="Foto do Murilo Ortiz"/><br>
        <sub>
          <b>Murilo Ortiz</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/SEU_LINKEDIN/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Murilo-Ortiz)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:seu.email@exemplo.com)

---
