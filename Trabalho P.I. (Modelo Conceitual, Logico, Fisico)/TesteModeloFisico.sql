select * from atribuicao_do_problema_atribui
select * from categoria
select * from relatorio_possui
select * from usuario
select * from endereco
select * from departamento_responsavel
select * from imagem
select * from problema

INSERT INTO Endereco (id_endereco, cep, logradouro, numero, cidade, bairro, estado, pais, longitude, latitude)
VALUES (20,12345678, 'Rua Exemplo', 123, 'Cidade Exemplo', 'Bairro Exemplo', 'Estado Exemplo', 'Brasil', -51.228889, -30.034722);


INSERT INTO Usuario (id_usuario, fk_endereco_id_endereco, nome_completo_usuario, cpf_usuario, telefone_usuario, email_usuario, senha_usuario, data_cadastro)
VALUES (300, 20, 'eduardo sanhudo fukui', '09250020520', 51992981244, 'fukuisanhudo@hotmail.com', 'greninja', CURRENT_DATE);


insert into departamento_responsavel (id_departamento,nome_departamento,contato_responsavel)
values(150,'reclama SL','eduardo fukui')


insert into categoria(id_categoria,nome_categoria,descricao_categoria)
values(200,'pavimentacao irregular','tem um buraco na rua')


INSERT INTO problema ( id_problema, fk_categoria_id_categoria, nome_problema, prioridade_problema, descricao_problema, comentario_resolucao, avaliacao_usuario, data_hora_resolucao, responsavel_resolucao)
VALUES (400, 200, 'pavimentacao irregular', 'alto', 'tem outro buraco na rua', 'nao foi resolvido', 'dou nota 3, deixaram a desejar', CURRENT_DATE, 'eduardo fukui');


insert into imagem(id_imagem)
values(600)

insert into atribuicao_do_problema_atribui(id_atribuicao,fk_problema_id_problema,fk_departamento_responsavel_id_departamento,observacoes,data_hora_atribuicao)
values(500,400,150,'o buraco foi fechado',current_date)

INSERT INTO relatorio_possui (id_relatorio, fk_problema_id_problema, fk_usuario_id_usuario, fk_imagem_id_imagem, data_relatorio, hora, status, descricao_relatorio)
VALUES ( 600, 400, 300, 600, CURRENT_DATE, current_date, 'pendente','o buraco foi fechado');


update endereco set complemento = 'casa de 2 pisos com portao branco' where id_endereco = 20
update endereco set fk_problema_id_problema = 400 where id_endereco = 20
update endereco set fk_usuario_id_usuario = 300 where id_endereco = 20