/* Modelo Logico PI: */

CREATE TABLE Usuario (
    ID_Usuario NUMERIC(65) PRIMARY KEY,
    fk_Endereco_ID_endereco NUMERIC(65),
    Nome_Completo_Usuario VARCHAR(65),
    CPF_Usuario VARCHAR(65),
    Telefone_USuario NUMERIC(65),
    Email_Usuario VARCHAR(65),
    Senha_Usuario VARCHAR(65),
    Data_Cadastro DATE
);

CREATE TABLE Problema (
    ID_Problema NUMERIC(65) PRIMARY KEY,
    fk_Categoria_ID_Categoria NUMERIC(65),
    Nome_Problema VARCHAR(65),
    Prioridade_Problema VARCHAR(65),
    Descricao_Problema VARCHAR(65),
    Comentario_Resolucao VARCHAR(65),
    Avaliacao_Usuario VARCHAR(65),
    Data_Hora_Resolucao DATE,
    Responsavel_Resolucao VARCHAR(65)
);

CREATE TABLE Categoria (
    ID_Categoria NUMERIC(65) PRIMARY KEY,
    Nome_Categoria VARCHAR(65),
    Descricao_Categoria VARCHAR(65)
);

CREATE TABLE Relatorio (
    ID_Relatorio NUMERIC(65) PRIMARY KEY,
    fk_Problema_ID_Problema NUMERIC(65),
    fk_Usuario_ID_Usuario NUMERIC(65),
    fk_Imagem_ID_Imagem NUMERIC(65),
    Data_Relatorio DATE,
    Hora DATE,
    Status VARCHAR(65),
    Descricao_Relatorio VARCHAR(65)
);

CREATE TABLE Endereco (
    ID_endereco NUMERIC(65) PRIMARY KEY,
    fk_Problema_ID_Problema NUMERIC(65),
    fk_Usuario_ID_Usuario NUMERIC(65),
    CEP NUMERIC(65),
    Logradouro VARCHAR(65),
    Numero NUMERIC(65),
    Complemento VARCHAR(65),
    Cidade VARCHAR(65),
    Bairro VARCHAR(65),
    Estado VARCHAR(65),
    Pais VARCHAR(65),
    Longitude DECIMAL(10,6),
    Latitude DECIMAL(10,6)
);

CREATE TABLE Departamento_Responsavel (
    ID_Departamento NUMERIC(65) PRIMARY KEY,
    Nome_Departamento VARCHAR(65),
    Contato_Responsavel VARCHAR(65)
);

CREATE TABLE Atribuicao_Do_Problema (
    ID_Atribuicao NUMERIC(65) PRIMARY KEY,
    fk_Problema_ID_Problema NUMERIC(65),
    fk_Departamento_Responsavel_ID_Departamento NUMERIC(65),
    Observacoes VARCHAR(65),
    Data_hora_Atribuicao DATE
);

CREATE TABLE Imagem (
    ID_Imagem NUMERIC(65) PRIMARY KEY,
    Imagem_Nome TEXT,
    Imagem LONGBLOB
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