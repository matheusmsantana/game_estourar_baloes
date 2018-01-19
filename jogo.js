//variavel global que armazena a chamada da função timeout
var timerId = null;

function iniciaJogo(){	
	//recuperando a url e nivel de jogo
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
	document.getElementById('cronometro').innerHTML = tempo_segundos;
	
	var qtde_baloes = 30;
	
	//chamando a função criaBaloes qtde_baloes como parametro
	criaBaloes(qtde_baloes);
	
	//imprimir qtde de baloes inteiros na span q contem o id baloes_inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;
	
	contagem_tempo(tempo_segundos +1);
}

 
function contagem_tempo(segundos){
	
	if(segundos == 0){
		//limpa a chamada de funçao setTimeout
		clearTimeout(timerId);
		
		gameOver();
		return false;
	}
	
	//decrementando minha variavel segundos para correr o tempo do cronometro corretamente
	segundos = segundos -1;
	
	document.getElementById('cronometro').innerHTML = segundos; 
	
	//função jquery setTimeout: requer dois parametros primeiro:funçao. segundo:tempo em mile segundos
	timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function gameOver(){
	alert('game over');
}

//função para criar os baloes
function criaBaloes(qtde_baloes){
	//laço de repetição para repetir a quantidade de baloes da minha variavel qtde_baloes
	for(var i=1;i<=qtde_baloes;i++){	

		var balao = document.createElement("img");
		
		//minha variavel q e uma tag img esta armazenando uma imagem
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		
		//Dando um id para cada balão de acordo com  var i da minha estrutura de repetição
		balao.id = 'b'+i;
		
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
		document.getElementById(id_balao).setAttribute("onclick", "");

		document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
		//alert(id_balao);
		pontuacao(-1);
	}
	
	function pontuacao(pontuacao){
		var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
		var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
		//Forçando o tipo das variaveis para INT
		baloes_inteiros = parseInt(baloes_inteiros);
		baloes_estourados = parseInt(baloes_estourados);
		
		//Fazendo decremento a minha varivel baloes_inteiros
		baloes_inteiros = baloes_inteiros + pontuacao;
		//chamando a função pontuacao para fazer incremento na variael baloes_estourados
		baloes_estourados = baloes_estourados - pontuacao;

		//Passando o valor das variaveis para os span com os id's correspondentes
		document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
		document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

		situacao_jogo(baloes_inteiros);
	}

	function situacao_jogo(baloes_inteiros){
		if(baloes_inteiros == 0){
			alert('Parabens você venceu o jogo');
			para_jogo();
		}
	}

	function para_jogo(){
		clearTimeout(timerId);
	}
