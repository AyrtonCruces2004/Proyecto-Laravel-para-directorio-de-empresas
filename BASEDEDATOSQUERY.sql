CREATE DATABASE [ayrton];
GO
USE [ayrton];
GO

CREATE TABLE dbo.users (
  id               BIGINT IDENTITY(1,1) PRIMARY KEY,
  name             NVARCHAR(255) NOT NULL,
  email            NVARCHAR(255) NOT NULL UNIQUE,
  email_verified_at DATETIME2(0) NULL,
  password         NVARCHAR(255) NOT NULL,
  remember_token   NVARCHAR(100) NULL,
  created_at       DATETIME2(0) NOT NULL CONSTRAINT DF_users_created_at  DEFAULT SYSDATETIME(),
  updated_at       DATETIME2(0) NOT NULL CONSTRAINT DF_users_updated_at  DEFAULT SYSDATETIME()
);
GO
CREATE TABLE dbo.roles (
  id         BIGINT IDENTITY(1,1) PRIMARY KEY,
  name       NVARCHAR(255) NOT NULL,
  guard_name NVARCHAR(255) NULL,
  created_at DATETIME2(0) NOT NULL CONSTRAINT DF_roles_created_at DEFAULT SYSDATETIME(),
  updated_at DATETIME2(0) NOT NULL CONSTRAINT DF_roles_updated_at DEFAULT SYSDATETIME()
);
GO
CREATE TABLE dbo.categorias (
  id         BIGINT IDENTITY(1,1) PRIMARY KEY,
  nombre     NVARCHAR(20)  NOT NULL,
  slug       NVARCHAR(20)  NOT NULL UNIQUE,
  descripcion NVARCHAR(MAX) NULL,
  menu       BIT           NOT NULL CONSTRAINT DF_categorias_menu  DEFAULT (1),
  orden      INT           NOT NULL CONSTRAINT DF_categorias_orden DEFAULT (0),
  urlfoto    NVARCHAR(100) NULL,
  created_at DATETIME2(0)  NOT NULL CONSTRAINT DF_categorias_created DEFAULT SYSDATETIME(),
  updated_at DATETIME2(0)  NOT NULL CONSTRAINT DF_categorias_updated DEFAULT SYSDATETIME()
);
GO
CREATE TABLE dbo.empresas (
  id          BIGINT IDENTITY(1,1) PRIMARY KEY,
  nombre      NVARCHAR(50)  NOT NULL,
  email       NVARCHAR(255) NULL,
  telefono    NVARCHAR(9)   NULL,
  direccion   NVARCHAR(50)  NULL,
  website     NVARCHAR(100) NULL,
  facebook    NVARCHAR(100) NULL,
  youtube     NVARCHAR(100) NULL,
  tiktok      NVARCHAR(100) NULL,
  descripcion NVARCHAR(MAX) NULL,
  urlfoto     NVARCHAR(50)  NULL,
  publicado   BIT           NOT NULL CONSTRAINT DF_empresas_publicado DEFAULT (1),
  orden       INT           NOT NULL CONSTRAINT DF_empresas_orden     DEFAULT (0),
  visitas     INT           NOT NULL CONSTRAINT DF_empresas_visitas   DEFAULT (0),

  categoria_id BIGINT       NOT NULL,
  user_id      BIGINT       NULL,

  created_at  DATETIME2(0)  NOT NULL CONSTRAINT DF_empresas_created DEFAULT SYSDATETIME(),
  updated_at  DATETIME2(0)  NOT NULL CONSTRAINT DF_empresas_updated DEFAULT SYSDATETIME(),

  CONSTRAINT FK_empresas_categorias FOREIGN KEY (categoria_id)
    REFERENCES dbo.categorias(id) ON DELETE CASCADE,

  CONSTRAINT FK_empresas_users FOREIGN KEY (user_id)
    REFERENCES dbo.users(id) ON DELETE SET NULL
);
GO

-- Índices útiles
CREATE INDEX IX_empresas_nombre       ON dbo.empresas(nombre);
CREATE INDEX IX_empresas_categoria_id ON dbo.empresas(categoria_id);
GO

INSERT INTO dbo.categorias (nombre, slug, descripcion, menu, orden)
VALUES ('Alimentos','alimentos','Productos alimentarios',1,0),
       ('Tecnología','tecnologia','Software/Hardware',1,1),
       ('Salud','salud','Servicios de salud',1,2);

INSERT INTO dbo.users (name,email,password)
VALUES ('Admin','admin@demo.test','hash-aqui');

INSERT INTO dbo.empresas
(nombre,email,telefono,direccion,descripcion,categoria_id,user_id)
VALUES
('Cliente III EIRL','cliente3@gmail.com','999222999','Av. Siempre Viva 123','Lorem ipsum…', 1, 1),
('Cliente II SRL','cliente2@gmail.com','988777666','Jr. Las Flores 456','Lorem ipsum…', 2, 1),
('Karina SAC','karina@gmail.com','987111222','Calle Sol 789','Lorem ipsum…', 3, 1);
select * from empresas
select * from categorias where orden>1;
select * from users
insert into dbo.empresas
(nombre,email,telefono,direccion,descripcion,categoria_id,user_id)
VALUES
('Gloria S.A.','contacto@gloria.com.pe','987654321','Av. República de Panamá 2461, La Victoria, Lima','Empresa dedicada a la producción y comercialización de lácteos y alimentos', 1, 1);
go
