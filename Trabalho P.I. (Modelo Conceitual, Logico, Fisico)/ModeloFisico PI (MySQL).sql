CREATE TABLE Usuario (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Completo_Usuario VARCHAR(150) NOT NULL,
    CPF_Usuario CHAR(11) UNIQUE NOT NULL,
    Telefone_Usuario VARCHAR(15) UNIQUE NOT NULL,
    Email_Usuario VARCHAR(150) UNIQUE NOT NULL,
    Senha_Usuario VARCHAR(255) NOT NULL,
    funcao ENUM('admin','usuario') NOT NULL,
    Data_Cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categoria (
    ID_Categoria INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Categoria VARCHAR(100) NOT NULL,
    Descricao_Categoria TEXT
);

CREATE TABLE Problema (
    ID_Problema INT AUTO_INCREMENT PRIMARY KEY,
    fk_Categoria_ID_Categoria INT NOT NULL,
    Nome_Problema VARCHAR(100) NOT NULL,
    Prioridade_Problema ENUM('Baixa','Média','Alta','Urgente') NOT NULL,
    Descricao_Problema TEXT,
    Comentario_Resolucao TEXT,
    Avaliacao_Usuario TINYINT CHECK (Avaliacao_Usuario BETWEEN 1 AND 5),
    Data_Hora_Resolucao DATETIME,
    Responsavel_Resolucao VARCHAR(150)
);

CREATE TABLE Imagem (
    ID_Imagem INT AUTO_INCREMENT PRIMARY KEY,
    Imagem_Nome VARCHAR(255) NOT NULL,
    Imagem LONGBLOB NOT NULL
);

CREATE TABLE Endereco (
    ID_Endereco INT AUTO_INCREMENT PRIMARY KEY,
    CEP CHAR(8) NOT NULL,
    Numero VARCHAR(10) NOT NULL,
    Complemento VARCHAR(100),
    Cidade VARCHAR(100) NOT NULL,
    Bairro VARCHAR(100) NOT NULL,
    Estado CHAR(2) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
    Longitude DECIMAL(9,6),
    Latitude DECIMAL(9,6)
);

CREATE TABLE Relatorio (
    ID_Relatorio INT AUTO_INCREMENT PRIMARY KEY,
    fk_Problema_ID_Problema INT NOT NULL,
    fk_Usuario_ID_Usuario INT NOT NULL,
    fk_Imagem_ID_Imagem INT,
    fk_Endereco_ID_Endereco INT NOT NULL,
    Data_Relatorio DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Pendente','Em Andamento','Resolvido')
        DEFAULT 'Pendente'
        NOT NULL,
    Descricao_Relatorio TEXT
);

CREATE TABLE Departamento_Responsavel (
    ID_Departamento INT AUTO_INCREMENT PRIMARY KEY,
    Nome_Departamento VARCHAR(150) NOT NULL,
    Contato_Responsavel VARCHAR(150) NOT NULL
);

CREATE TABLE Atribuicao_Do_Problema (
    ID_Atribuicao INT AUTO_INCREMENT PRIMARY KEY,
    fk_Problema_ID_Problema INT NOT NULL,
    fk_Departamento_Responsavel_ID_Departamento INT NOT NULL,
    Observacoes TEXT,
    Data_Hora_Atribuicao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CHAVES ESTRANGEIRAS

ALTER TABLE Problema
ADD CONSTRAINT FK_Problema_Categoria
FOREIGN KEY (fk_Categoria_ID_Categoria)
REFERENCES Categoria(ID_Categoria)
ON DELETE RESTRICT;

ALTER TABLE Relatorio
ADD CONSTRAINT FK_Relatorio_Problema
FOREIGN KEY (fk_Problema_ID_Problema)
REFERENCES Problema(ID_Problema);

ALTER TABLE Relatorio
ADD CONSTRAINT FK_Relatorio_Usuario
FOREIGN KEY (fk_Usuario_ID_Usuario)
REFERENCES Usuario(ID_Usuario);

ALTER TABLE Relatorio
ADD CONSTRAINT FK_Relatorio_Imagem
FOREIGN KEY (fk_Imagem_ID_Imagem)
REFERENCES Imagem(ID_Imagem);

ALTER TABLE Relatorio
ADD CONSTRAINT FK_Relatorio_Endereco
FOREIGN KEY (fk_Endereco_ID_Endereco)
REFERENCES Endereco(ID_Endereco);

ALTER TABLE Atribuicao_Do_Problema
ADD CONSTRAINT FK_Atribuicao_Problema
FOREIGN KEY (fk_Problema_ID_Problema)
REFERENCES Problema(ID_Problema);

ALTER TABLE Atribuicao_Do_Problema
ADD CONSTRAINT FK_Atribuicao_Departamento
FOREIGN KEY (fk_Departamento_Responsavel_ID_Departamento)
REFERENCES Departamento_Responsavel(ID_Departamento);