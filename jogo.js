//variavel global que armazena a chamada da função timeout
var timerId = null;

function iniciaJogo(){	
	//recuperando a url
	//var url = window.location;
	//recuperando nivel do jogo q foi setado pelo usuario
	var url = window.location.search;
	
	//substituindo o ? para ficar value q o usuario setou
	var nivel_jogo = url.replace("?","");
	//alert(nivel_jogo);
	
	var tempo_segundos = 0;
	
	if(nivel_jogo == 1){
		tempo_segundos = 120;
	}else if(nivel_jogo == 2){
		tempo_segundos = 60;
	}else{
		tempo_segundos = 30;
	} 
	
	//inserindo segundo no span com id cronometro
	//innerHTML serve para inserir um conteudo dentro da tag
	//entao aki no caso estou atribuindo a variavel tempo_segundos a minha span 
	document.getElementById('cronometro').innerHTML = tempo_segundos;
	
	//quantidade de baloes
	var qtde_baloes = 30;
	
	//chamando minha funçao cria baloes e passando a variavel qtde_baloes como parametro
	criaBaloes(qtde_baloes);
	
	//imprimir qtde de baloes inteiros na span q contem o id baloes_inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	//imprimir qtde de baloes estorados na span q contem o id baloes_estourados
	document.getElementById('baloes_estourados').innerHTML = 0;
	
	//Chamando minha Função contagem_tempo()
	//passando quantidade em segundos no parametro da função 
	contagem_tempo(tempo_segundos +1);
}

//Contagem de tempo para termino do jogo
//dentro do parametro criei uma variavel para fazer referencia ao que esta sendo passado 
function contagem_tempo(segundos){
	
	if(segundos == 0){
		//Esta função serve para limpar a chamada de funçao setTimeout
		clearTimeout(timerId);
		//chamando minha função de fim de jogo
		gameOver();
		return false;
	}
	
	//decrementando minha variavel segundos para correr o tempo do cronometro corretamente
	segundos = segundos -1;
	//Minha span com id cronometro esta recebendo a variavel segundos
	document.getElementById('cronometro').innerHTML = segundos; 
	
	//função jquery setTimeout: requer dois parametros primeiro:funçao. segundo:tempo em mile segundos
	//a cada 1 segundo chame a função contagem_tempo passando a variavel segundos como parametro
	timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

//Função de gameOver chamada caso cromonetro seja zerado
function gameOver(){
	alert('game over');
}

//função para criar os baloes
function criaBaloes(qtde_baloes){
	//laço de repetição para repetir a quantidade de baloes da minha variavel qtde_baloes
	for(var i=1;i<=qtde_baloes;i++){	
		//Função createElement: me permite criar uma tag. 
		//Aki estou criando uma tag IMG e passando está tag para a variavel balao
		var balao = document.createElement("img");
		
		//minha variavel q e uma tag img esta armazenando uma imagem
		balao.src = 'imagens/balao_azul_pequeno.png';
		
		//dando estilo a imagem.
		balao.style.margin = '10px';
		
		//Dando um id para cada balão de acordo com i da minha estrutura de repetição
		balao.id = 'b'+i;

		//Ao clicar na img balao ele ira chamar a função estourar
		//que recebe como parametro ela mesma
		balao.onclick = function(){
			estourar(this);
		}
		
		//aki estou adicionando a minha tag img dentro da minha div com id cenario
		document.getElementById('cenario').appendChild(balao);
	}	
		
	}
	//function para contabilizar os balões estourados
	function estourar(balao){
		var id_balao = balao.id;

		/*Removendo a função de onclick para o balao cujo id seja de 
		acordo com a estrutura de repetição*/
		/*setAttribute: recebe dois parametros, o primeiro e o atributo que
		 do elemento que desejo alterar, e o valor que desejo passar este atributo*/
		document.getElementById(id_balao).setAttribute("onclick", "");

		//Alterando a imagem de acordo com onclick do usuario
		document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
		//alert(id_balao);
		pontuacao(-1);
	}
	
	function pontuacao(pontuacao){
		//Passando a quantia de balões a estorar para a variavel baloes_inteiros
		var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
		//Passando a quantia de balões estorados para a variavel baloes_estourados
		var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
		//Forçando o tipo das variaveis para INT
		baloes_inteiros = parseInt(baloes_inteiros);
		baloes_estourados = parseInt(baloes_estourados);
		//Fazendo decremento a minha varivel baloes_inteiros
		//Aki estou chamando a minha função pontuacao para que seja feito decremento na variavel baloes_inteiros
		baloes_inteiros = baloes_inteiros + pontuacao;
		//chamando minha função pontuacao para fazer incremento na variael baloes_estourados
		baloes_estourados = baloes_estourados - pontuacao;

		//alert(baloes_inteiros);
		//alert(baloes_estourados);

		//Passando o valor das variaveis para os span com os id's correspondentes
		document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
		document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

		//Chamando minha função situacao_jogo e passando a variavel baloes_inteiros como
		//parametro para que seja verificado se o jogador finalizou o jogo
		situacao_jogo(baloes_inteiros);
	}

	//Função para verificar se não restam balões e chamar minha função
	//para limpar meu cronometro
	function situacao_jogo(baloes_inteiros){
		if(baloes_inteiros == 0){
			alert('Parabens você venceu o jogo');
			para_jogo();
		}
	}

	//Limpando meu cronometro
	function para_jogo(){
		clearTimeout(timerId);
	}
