# PetShop API

Uma aplicação full-stack completa para gerenciamento de pet shop, desenvolvida com **Spring Boot** no backend e **React** no frontend.

## 📋 Visão Geral

O PetShop API é um sistema web moderno que permite gerenciar produtos, serviços de pet shop, histórico de vendas e autenticação de usuários. A aplicação oferece uma interface intuitiva no frontend e uma API RESTful robusta no backend.

### Características Principais

- 🔐 **Autenticação de Usuários**: Sistema de login seguro
- 📦 **Gestão de Produtos**: CRUD completo de produtos com controle de estoque
- 🛒 **Histórico de Vendas**: Rastreamento detalhado de transações
- 🐾 **Serviços de Pet Shop**: Gerenciamento de serviços oferecidos
- 🔄 **Interface Responsiva**: Frontend moderno com React e Vite
- 📊 **Dashboard**: Visualização de dados e histórico

---

## 🏗️ Arquitetura

### Estrutura do Projeto

```
petshop/
├── backend/                 # API Spring Boot
│   ├── src/main/java/      # Código-fonte Java
│   │   └── com/example/petshop/
│   │       ├── controller/   # Controladores REST
│   │       ├── model/        # Entidades JPA
│   │       ├── repository/   # Repositories (DAO)
│   │       ├── dto/          # Data Transfer Objects
│   │       └── infra/        # Configurações (CORS, etc)
│   ├── pom.xml             # Dependências Maven
│   └── target/             # Build output
│
├── src/                    # Frontend React
│   ├── components/         # Componentes React reutilizáveis
│   ├── hooks/              # Custom React Hooks
│   ├── interface/          # Tipos TypeScript
│   └── App.tsx             # Componente raiz
│
├── package.json            # Dependências Node.js
├── vite.config.ts          # Configuração Vite
├── tsconfig.json           # Configuração TypeScript
└── README.md              # Este arquivo
```

---

## 🚀 Stack Tecnológico

### Backend

| Tecnologia          | Versão | Descrição                   |
| ------------------- | ------ | --------------------------- |
| **Java**            | 21     | Linguagem de programação    |
| **Spring Boot**     | 4.0.6  | Framework web Java          |
| **Spring Data JPA** | -      | ORM para banco de dados     |
| **MySQL**           | -      | Banco de dados relacional   |
| **Lombok**          | -      | Redução de boilerplate Java |
| **Maven**           | -      | Gerenciador de dependências |

### Frontend

| Tecnologia       | Versão  | Descrição                        |
| ---------------- | ------- | -------------------------------- |
| **React**        | 19.2.6  | Biblioteca UI                    |
| **TypeScript**   | 6.0.2   | Tipagem estática para JavaScript |
| **Vite**         | 8.0.12  | Build tool moderno               |
| **React Query**  | 5.101.0 | Gerenciamento de estado e cache  |
| **Axios**        | 1.17.0  | Cliente HTTP                     |
| **Lucide React** | 1.17.0  | Biblioteca de ícones             |

---

## 📦 Requisitos

### Pré-requisitos

- **Java 21 ou superior** - [Download JDK](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi)
- **Node.js 18+** e **npm** - [Download Node.js](https://nodejs.org/)
- **MySQL 5.7 ou superior** - [Download MySQL](https://dev.mysql.com/downloads/mysql/)

### Verificar instalação

```bash
# Verificar Java
java -version

# Verificar Maven
mvn -version

# Verificar Node.js e npm
node --version
npm --version

# Verificar MySQL (se instalado localmente)
mysql --version
```

---

## ⚙️ Configuração e Instalação

### 1️⃣ Clonar o Repositório

```bash
git clone <seu-repositorio-url>
cd petshop
```

### 2️⃣ Configurar o Backend

#### Configurar banco de dados

Edite o arquivo `backend/src/main/resources/application.properties`:

```properties
# Database configuration (MySQL)
spring.datasource.url=jdbc:mysql://localhost:3306/petshop?createDatabaseIfNotExist=true
spring.datasource.username=seu_usuario_mysql
spring.datasource.password=sua_senha_mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate configurations
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

#### Instalar dependências do backend

```bash
cd backend
mvn clean install
```

### 3️⃣ Configurar o Frontend

#### Instalar dependências

```bash
cd ../
npm install
```

#### Configurar variáveis de ambiente (opcional)

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:8080
```

---

## 🎯 Como Executar

### Executar Backend (Terminal 1)

```bash
cd backend

# Compilar e executar
mvn spring-boot:run

# Ou executar o JAR diretamente após build
mvn clean package
java -jar target/petshop-0.0.1-SNAPSHOT.jar
```

O backend estará disponível em: `http://localhost:8080`

### Executar Frontend (Terminal 2)

```bash
# Na raiz do projeto
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

### Build para Produção

```bash
# Frontend
npm run build

# Backend
cd backend
mvn clean package
```

---

## 📡 Endpoints da API

### Autenticação

```
POST   /api/auth/login          # Login de usuário
```

### Produtos

```
GET    /products                # Listar todos os produtos
POST   /products                # Criar novo produto
PUT    /products/{id}           # Atualizar produto
DELETE /products/{id}           # Deletar produto
```

### Histórico

```
GET    /history                 # Listar histórico de vendas
GET    /history/{productId}     # Listar histórico de produto específico
```

### Serviços de Pet Shop

```
GET    /petservices             # Listar serviços disponíveis
POST   /petservices             # Criar novo serviço
PUT    /petservices/{id}        # Atualizar serviço
DELETE /petservices/{id}        # Deletar serviço
```

---

## 🗄️ Modelos de Dados

### Usuário (User)

```json
{
  "id": 1,
  "username": "admin",
  "password": "senha_criptografada"
}
```

### Produto (Product)

```json
{
  "id": 1,
  "name": "Ração Premium",
  "description": "Ração de alta qualidade",
  "price": 49.9,
  "quantity": 100,
  "image": "url_da_imagem",
  "active": true
}
```

### Histórico de Produto (ProductHistory)

```json
{
  "id": 1,
  "productName": "Ração Premium",
  "actionType": "ADD",
  "quantityChange": 100,
  "oldPrice": null,
  "newPrice": 49.9,
  "timestamp": "2024-01-15T10:30:00",
  "details": "Produto adicionado com estoque inicial de 100 unidades."
}
```

### Serviço de Pet (PetService)

```json
{
  "id": 1,
  "name": "Banho e Tosa",
  "description": "Banho completo com tosa",
  "price": 60.0,
  "active": true
}
```

---

## 🔐 Segurança

### Autenticação

- Sistema de login baseado em username/password
- Validação de credenciais contra banco de dados

### CORS

- Configuração habilitada para aceitar requisições de diferentes origens
- Endpoints protegidos com validação de autenticação

### Recomendações

- 🔒 Implementar **JWT (JSON Web Tokens)** para sessões mais seguras
- 🔐 Criptografar senhas com **bcrypt** ou **Argon2**
- 🛡️ Implementar rate limiting
- ✅ Adicionar validação de entrada (Spring Validation)
- 📝 Implementar logs de auditoria

---

## 📝 Componentes Frontend

### Principais Componentes

- **Login**: Tela de autenticação de usuários
- **Navbar**: Barra de navegação superior
- **Card**: Componente reutilizável de cartão
- **ProductServicesView**: Visualização de produtos e serviços
- **SellModal**: Modal para registrar vendas
- **EditModal**: Modal para editar produtos
- **CreateModal**: Modal para criar produtos
- **HistoryTable**: Tabela de histórico de transações
- **Search**: Componente de busca

### Custom Hooks

- `useProductData`: Fetch e gerenciamento de produtos
- `usePetServices`: Fetch e gerenciamento de serviços
- `useHistoryData`: Fetch de histórico de vendas
- `useProductMutations`: Operações de criar/editar/deletar

---

## 🧪 Testes

### Executar Testes Backend

```bash
cd backend
mvn test
```

### Executar Linter Frontend

```bash
npm run lint
```

---

## 🐛 Troubleshooting

### Problema: "Conexão recusada" no MySQL

**Solução:**

- Verifique se MySQL está rodando: `systemctl status mysql` (Linux) ou Services (Windows)
- Confirme as credenciais em `application.properties`
- Verifique se a porta 3306 está aberta

### Problema: Backend em porta diferente de 8080

**Solução:**
Adicione em `application.properties`:

```properties
server.port=9090
```

### Problema: CORS error no frontend

**Solução:**
Verifique se `@CrossOrigin` está configurado nos controladores e ajuste as origens permitidas.

### Problema: Porta 5173 já em uso

**Solução:**

```bash
npm run dev -- --port 3000  # Usar porta 3000
```

---

## 📚 Documentação Adicional

### Backend

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA Documentation](https://spring.io/projects/spring-data-jpa)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Frontend

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

---

## 🚀 Deploy

### Deploy Backend (Heroku/Cloud)

```bash
cd backend
mvn clean package
# Upload do JAR para servidor
```

### Deploy Frontend (Vercel/Netlify)

```bash
npm run build
# Upload da pasta 'dist' para serviço de hosting
```

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

---

## 👥 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas:

- Abra uma issue no repositório
- Entre em contato com o time de desenvolvimento
- Consulte a documentação nos links acima

---

## 📋 Checklist de Desenvolvimento

- [ ] Banco de dados MySQL configurado
- [ ] Backend rodando em `localhost:8080`
- [ ] Frontend rodando em `localhost:5173`
- [ ] Testes passando (`mvn test` e `npm run lint`)
- [ ] Autenticação funcionando
- [ ] CRUD de produtos funcionando
- [ ] Histórico registrando eventos
- [ ] Interface responsiva testada

---

**Versão:** 0.0.1  
**Última atualização:** Junho 2024  
**Maintainer:** Seu Nome/Time
