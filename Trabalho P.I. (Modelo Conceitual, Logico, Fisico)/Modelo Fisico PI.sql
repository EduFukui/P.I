/* Modelo Logico PI: */

CREATE TABLE Usuario (
    ID_Usuario NUMERIC(255) PRIMARY KEY,
    fk_Endereco_ID_endereco NUMERIC(255),
    Nome_Completo_Usuario VARCHAR(255),
    CPF_Usuario VARCHAR(255),
    Telefone_USuario NUMERIC(255),
    Email_Usuario VARCHAR(255),
    Senha_Usuario VARCHAR(255),
    Data_Cadastro DATE
);

CREATE TABLE Problema (
    ID_Problema NUMERIC(255) PRIMARY KEY,
    fk_Categoria_ID_Categoria NUMERIC(255),
    Nome_Problema VARCHAR(255),
    Prioridade_Problema VARCHAR(255),
    Descricao_Problema VARCHAR(255),
    Comentario_Resolucao VARCHAR(255),
    Avaliacao_Usuario VARCHAR(255),
    Data_Hora_Resolucao DATE,
    Responsavel_Resolucao VARCHAR(255)
);

CREATE TABLE Categoria (
    ID_Categoria NUMERIC(255) PRIMARY KEY,
    Nome_Categoria VARCHAR(255),
    Descricao_Categoria VARCHAR(255)
);

CREATE TABLE Relatorio (
    ID_Relatorio NUMERIC(255) PRIMARY KEY,
    fk_Problema_ID_Problema NUMERIC(255),
    fk_Usuario_ID_Usuario NUMERIC(255),
    fk_Imagem_ID_Imagem NUMERIC(255),
    Data_Relatorio DATE,
    Hora DATE,
    Status VARCHAR(255),
    Descricao_Relatorio VARCHAR(255)
);

CREATE TABLE Endereco (
    ID_endereco NUMERIC(255) PRIMARY KEY,
    fk_Problema_ID_Problema NUMERIC(255),
    fk_Usuario_ID_Usuario NUMERIC(255),
    CEP NUMERIC(255),
    Logradouro VARCHAR(255),
    Numero NUMERIC(255),
    Complemento VARCHAR(255),
    Cidade VARCHAR(255),
    Bairro VARCHAR(255),
    Estado VARCHAR(255),
    Pais VARCHAR(255),
    Longitude DECIMAL(10,6),
    Latitude DECIMAL(10,6)
);

CREATE TABLE Departamento_Responsavel (
    ID_Departamento NUMERIC(255) PRIMARY KEY,
    Nome_Departamento VARCHAR(255),
    Contato_Responsavel VARCHAR(255)
);

CREATE TABLE Atribuicao_Do_Problema (
    ID_Atribuicao NUMERIC(255) PRIMARY KEY,
    fk_Problema_ID_Problema NUMERIC(255),
    fk_Departamento_Responsavel_ID_Departamento NUMERIC(255),
    Observacoes VARCHAR(255),
    Data_hora_Atribuicao DATE
);

CREATE TABLE Imagem (
    ID_Imagem NUMERIC(255) PRIMARY KEY,
    Imagem_Nome TEXT,
    Imagem BYTEA
);
 
ALTER TABLE Usuario ADD CONSTRAINT FK_Usuario_2
    FOREIGN KEY (fk_Endereco_ID_endereco)
    REFERENCES Endereco (ID_endereco);
 
ALTER TABLE Problema ADD CONSTRAINT FK_Problema_2
    FOREIGN KEY (fk_Categoria_ID_Categoria)
    REFERENCES Categoria (ID_Categoria)
    ON DELETE RESTRICT;
 
ALTER TABLE Relatorio ADD CONSTRAINT FK_Relatorio_2
    FOREIGN KEY (fk_Problema_ID_Problema)
    REFERENCES Problema (ID_Problema);
 
ALTER TABLE Relatorio ADD CONSTRAINT FK_Relatorio_3
    FOREIGN KEY (fk_Usuario_ID_Usuario)
    REFERENCES Usuario (ID_Usuario);
 
ALTER TABLE Relatorio ADD CONSTRAINT FK_Relatorio_4
    FOREIGN KEY (fk_Imagem_ID_Imagem)
    REFERENCES Imagem (ID_Imagem);
 
ALTER TABLE Endereco ADD CONSTRAINT FK_Endereco_2
    FOREIGN KEY (fk_Problema_ID_Problema)
    REFERENCES Problema (ID_Problema)
    ON DELETE RESTRICT;
 
ALTER TABLE Endereco ADD CONSTRAINT FK_Endereco_3
    FOREIGN KEY (fk_Usuario_ID_Usuario)
    REFERENCES Usuario (ID_Usuario);
 
ALTER TABLE Atribuicao_Do_Problema ADD CONSTRAINT FK_Atribuicao_Do_Problema_2
    FOREIGN KEY (fk_Problema_ID_Problema)
    REFERENCES Problema (ID_Problema);
 
ALTER TABLE Atribuicao_Do_Problema ADD CONSTRAINT FK_Atribuicao_Do_Problema_3
    FOREIGN KEY (fk_Departamento_Responsavel_ID_Departamento)
    REFERENCES Departamento_Responsavel (ID_Departamento);