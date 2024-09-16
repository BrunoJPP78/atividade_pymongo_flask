# Flask App - Produtos, Pedidos e Clientes

Este projeto é uma aplicação simples utilizando Flask que permite a navegação entre três páginas: Produtos, Pedidos e Clientes.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado:

- [Python 3.x](https://www.python.org/downloads/)
- [Flask](https://flask.palletsprojects.com/)

Para instalar as dependências necessárias, execute o comando abaixo no terminal:

```bash
pip install flask
```

Passo a Passo para Iniciar o Projeto
1. Crie o ambiente virtual (opcional)
É recomendado criar um ambiente virtual para isolar as dependências da aplicação.

```bash
python -m venv venv
```

Ative o ambiente virtual:

No Windows:
```bash
venv\Scripts\activate
```
No macOS/Linux:
```bash
source venv/bin/activate
```

2. Instale as dependências
No diretório do projeto, execute:
```bash
pip install flask
```

3. Execute a aplicação
No diretório raiz do projeto (onde está o arquivo app.py), execute o seguinte comando para iniciar o servidor Flask:

```bash
python app.py
```

4. Acesse a aplicação
Abra o navegador e vá até:

```arduino
http://127.0.0.1:5000/
```

5. Configuração do MongoDB
   
<b> OBS: A aplicação está configurada para utilizar o MongoDB como banco de dados. O arquivo config.py contém a configuração de conexão com o MongoDB e define as coleções que serão utilizadas. </b>

Você verá a página inicial com três botões que levam às páginas de Produtos, Pedidos e Clientes.

<u>Tecnologias Utilizadas</u>
<li>Python</li>
<li>Flask</li>
<li>Bootstrap</li>
<li>JavaScript</li>
<li>MongoDB</li>

