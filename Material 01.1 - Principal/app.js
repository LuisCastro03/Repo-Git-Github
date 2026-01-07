let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

/*

                        Git e GitHub

Comandos se não tiver um repositório local:

echo "# numero-secreto" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/rodrigoalura87/numero-secreto.git
git push -u origin main

Comandos se tiver um repositório local:

git remote add origin https://github.com/rodrigoalura87/numero-secreto.git
git branch -M main
git push -u origin main

                        Comandos Git

echo "# numero-secreto" >> README.md

1. echo: imprime o texto que vem após ele;

2. "# numero-secreto": é o texto imprimido;

2.1. #: em Markdown, # no início de uma linha indica um título de
nível 1;

2.2. "": o que estiver escrito entre "" é um texto que será
imprimido;

2.3. >>: significa redirecionamento de saída com append (pega o
texto escrito anteriormente e acrescenta-o ao final de um arquivo,
preservando o conteúdo existente);

3. README.md: arquivo usado principalmente para documentações de
projetos, em formato de Markdown;

git init: usado para converter um diretório existente no
computador, geralmente sendo diretório de algum projeto, em um
repositório git;

git add: adiciona um arquivo do projeto ao commit (caso o nome do
arquivo seja informado após esse comando);

git add .: Alternativamente, pode-se adicionar todos os arquivos do
repositório, usando o . após o comando;

git commit -m "first commit": serve para registrar as alterações
feitas no repositório local. O -m serve para adicionar uma
mensagem descritiva sobre as mudanças que foram feitas, inserindo
após o -m e entre aspas, para ser considerado um texto;

git config --global user.email "your@example.com"
git config --global user.name "Your Name": tanto o primeiro
comando quanto o segundo servem para linkar o Git com o GitHub,
sendo possível realizar commits, desde que as informações
fornecidas sejam idênticas. Qualquer repositório que for criado no
computador, o Git irá reconhecer e permitirá o commit;

git branch -M main: renomeia a branch atual do seu repositório
para "main";

git remote add origin <URL_do_repositório>: serve para criar uma
conexão entre o repositório local e o remoto. O "git remote add"
cria um "apelido" para o repositório remoto, que nesse caso seria
o "origin" e associa a URL do repositório ao apelido;

git push -u origin main: usado para enviar as alterações locais
para o repositório remoto e configurar o rastreamento da branch
"main";

                Chave SSH - Geração passo a passo

Copiar o link SSH do repositório e colar no terminal da IDE.
Após isso, o Git dará a opção de gerar uma chave SSH com a
seguinte impressão:

Are you sure you want to continue connecting
(yes/no/[fingerprint])?

Respondendo que sim, o Git manda uma mensagem dizendo que não
reconhece esse computador:

Warning: Permanently added 'github.com' (ED25519) to the list of
known hosts

git@github.com: Permission denied (publickey)

------------------------------------------------------------------

Indo ao GitHub, vamos em "settings", depois em "SSH and GPG keys"
e "New SSH key". Com isso, devemos colocar um título, como
"computador pessoal", para saber identificar que chave é essa.
Ainda nessa página, ele solicita um tipo, que nesse caso, é uma
chave de autenticação (Authentication key), e também nos orienta
colar uma chave, que será explicado a seguir onde se consegue.

Voltando ao terminal da IDE, quando pressionamos anteriormente a
opção "yes", deve ter gerado uma chave que fica salva dentro do
computador na pasta do usuário. Pode-se tanto procurar pelo
terminal quanto procurar no explorador de arquivos, que é o que
será feito por ser mais fácil.
Abrindo o explorador de arquivos, será necessário entrar na pasta
do usuário e procurar uma pasta oculta chamada ".ssh". Abrindo-a,
há um arquivo chamado "known_hosts", que são os hosts conhecidos,
mas a chave não foi gerada.
Para gerar a chave, deve-se copiar o comando sugerido
"ssh-keygen -t ed25519 -C" seguido do e-mail da conta do GitHub.
No terminal da IDE, cole o comando.

ssh-keygen -t ed25519 -C "luisr.contato@gmail.com"

Clicando em "Enter", ele informa que gerará um par de chaves SSH, 
perguntando em seguida onde queremos salvar esse arquivo.

Enter file in which to save the key
(/c/Users/01309884/.ssh/id_ed25519):

Pode clicar em "Enter" para salvá-lo na própria pasta SSH, que é a
pasta padrão. Ele pergunta se quer digitar uma senha.

Enter passphrase (empty for no passphrase):

Caso digite uma senha, toda vez que for sincronizar com o GitHub,
ele pedirá essa senha. Portanto, clique em "Enter" para não ter
uma senha. Depois, clique em "Enter" novamente para confirmar que
não haverá senha.
Após isso, a chave é gerada.

Indo até a pasta do usuário > .ssh, pode-se visualizar 2 novos
arquivos chamados "id_ed25519", um com a chave privada e outro
público.
Abrindo o arquivo da chave pública com o bloco de notas, vemos o
código da chave começando com "ssh ed-25519" que precisamos copiar
e colar no site do GitHub.

Voltando ao GitHub, vamos colar a chave pública no campo key e
apertar o botão "Add SSH Key" para adicionar a chave SSH. O GitHub
adiciona e lista a chave do computador pessoal em "SSH Keys".

*/