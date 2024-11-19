create database API;
use API;
 
create table vereador 
(id_vereador int primary key auto_increment,
nome varchar(100) not null);

create table proj_leis_aprovados
(pro_protocolo int primary key auto_increment,
pro_autor varchar(100) not null,
pro_tipo varchar(100) not null,
pro_situacao varchar(50) not null,
pro_data date not null,
pro_processo int not null,
pro_ano int not null,
pro_numero int not null,
pro_ementa varchar(1000) not null);

create table votação
(id_votação int primary key auto_increment,
título varchar(100) not null,
descrição text);

create table posicionamento_votação
(id_votação int,
id_vereador int,
posicionamento ENUM('Favorável', 'Contrário', 'Abstenção'),
primary key (id_votação, id_vereador),
foreign key (id_votação) references votação (id_votação),
foreign key (id_vereador) references vereador (id_vereador));

create table comentário
(id_comentário int primary key auto_increment,
id_usuário varchar(100) not null,
texto text not null,
data date not null,
avaliação int,
id_vereador int,
foreign key (id_vereador) references vereador (id_vereador));