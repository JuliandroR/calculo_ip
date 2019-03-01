const calc_ip = new Vue({
    el: '#primeira_parte',

    data: {
        nova_mascara: "-",
        hosts_validos_total: "-",
        hosts_validos: "-",
        sub_redes: "-"
    },

    methods: {
        calc: function () {
            teste(1);
            console.log("Rodou!");
            let ip = document.getElementById('ip').value;
            let quant_sub = document.getElementById('quant').value;
            let y = 0;

            let ip_split = ip.split(".");

            if (ip_split.length != 4
                || ip_split[0] > 255
                || ip_split[1] > 255
                || ip_split[2] > 255
                || ip_split[3] > 255) {
                alert("Ip Inválido, ele não possui 4 (quatro) octetos válidos");
            } else {


                if (ip_split[0] > 191 && ip_split[0] < 224) { //verifica se o IP é de classe C, verificando seu primeiro octeto
                    let x = 0;
                    while (x < quant_sub) {// uma estrutura de repetição para verificar quanto bits são necessários para criar as sub redes desejadas
                        y++;
                        x = Math.pow(2, y);
                    };
                    if (x < 130) {

                        let z = 128;
                        let cont = 0;
                        let quarto_octeto = 0;

                        while (cont < y) { //estrutura de repetição que define o novo valor do quarto octeto, com base nos bits recolhidos para as subredes
                            quarto_octeto += z;
                            z = z / 2;
                            cont += 1;
                        };
                        this.nova_mascara = `255.255.255.${quarto_octeto}`; //repassa para o visualização, o valor da nova máscara


                        let bits_restantes = 8 - y; //calcula quanto bits restaram para host's

                        let h_valido = (Math.pow(2, bits_restantes) - 2); //calcula quanto host's são válidos por sub rede
                        let h_valido_total = ((Math.pow(2, bits_restantes) * x) - 2 * x); //calcula quanto host's são válidos como um todo

                        this.hosts_validos = `${h_valido}`; //retorna para a camada de view a quantidade de host's válidos por sub rede
                        this.hosts_validos_total = `${h_valido_total}`; //retorna para a camada de view a quantidade de host's válidos no total

                        let intervalo = h_valido + 2; //define o intervalo entre um host e outro, com base na quantidade de host's válidos

                        //seta o parâmetros de cada host
                        let rede = 0 - intervalo;
                        let primeiro_valido = 1;
                        let ultimo_valido = h_valido;
                        let broadcast = ultimo_valido + 1;
                        let result = []

                        while (rede != quarto_octeto) { //estrutura de repetição que adiciona os hosts de cada sub rede
                            rede += intervalo;

                            //retorna para a camada de visualização o ip de rede da sub rede
                            result.push(`Rede: ${ip_split[0]}.${ip_split[2]}.${ip_split[2]}.${rede}`);

                            //retorna para a camada de visualização os host's válidos da sub rede
                            result.push(`Host's válidos: ${ip_split[0]}.${ip_split[2]}.${ip_split[2]}.${primeiro_valido} até ${ip_split[0]}.${ip_split[2]}.${ip_split[2]}.${ultimo_valido}`);

                            //retorna para a camada de visualização o broadcast da sub rede
                            result.push(`Broadcast: ${ip_split[0]}.${ip_split[2]}.${ip_split[2]}.${broadcast}`);

                            result.push(`--`);

                            console.log(result);

                            //seta os parâmetros para a próxima sub rede
                            primeiro_valido += intervalo;
                            ultimo_valido += intervalo;
                            broadcast += intervalo;
                        };
                        this.sub_redes = result;
                    } else {
                        alert("Não há numero de host's suficientes para fazer essa divisão");
                    }
                } else {
                    alert("Esse IP não pertence a classe C");
                }
            }
        },

        clear: function () { //função para limpar as informações presentes na tela
            ip = document.getElementById('ip').value = "";
            quant_sub = document.getElementById('quant').value = "";
            this.nova_mascara = "-";
            this.hosts_validos = "-";
            this.sub_redes = "-";
            this.hosts_validos_total = "-";

        }
    }

});


const calp_sub_rede = new Vue({
    el: "#segunda_parte",

    data: {
        classe_ip: "-",
        quant_sub_redes: "-"
    },

    methods: {
        calcular: function () {
            teste(2);
            console.log("Executou");
            let ip = document.getElementById("ip_desejo").value;
            let quant_hosts = parseInt(document.getElementById("quant_hosts").value);
            quant_hosts += 2;
            console.log(`quant hosts: ${quant_hosts}, ip: ${ip}`);

            let ip_split = ip.split(".");

            if (ip_split.length == 4) {
                let x = 0;
                let bits = 0;
                while (x < (quant_hosts)) {
                    bits += 1;
                    x = (Math.pow(2, bits) + 2);
                    console.log(`bits: ${bits}, resultado: ${x}`);
                }

                if (ip_split[0] > 0 && ip_split[0] < 127) {
                    this.classe_ip = "A";
                    let num_sub_redes = Math.pow(2, (24 - bits));
                    this.quant_sub_redes = num_sub_redes;

                } else if (ip_split[0] > 127 && ip_split[0] < 192) {
                    this.classe_ip = "B";
                    let num_sub_redes = Math.pow(2, (16 - bits));
                    this.quant_sub_redes = num_sub_redes;
                    
                } else if (ip_split[0] > 191 && ip_split[0] < 224) {
                    this.classe_ip = "C";
                    let num_sub_redes = Math.pow(2, (8 - bits));
                    this.quant_sub_redes = num_sub_redes;

                } else {
                    alert("O IP inserido não é passível para sub redes");
                }

            } else {
                alert("Ip Inserido é Inválido");
            }
        },

        clear: function () {
            document.getElementById("ip_desejo").value = "-";
            document.getElementById("quant_hosts").value = "-";
            this.classe_ip = "-";
            this.quant_sub_redes = "-";
        }
    }
});


const analise_mascara = new Vue({
    el: "#terceira_parte",

    data: {
        classe_ip: "-",
        num_sub_redes: "-",
    },

    methods: {
        exibir: function () {
            teste(3);
            mascara = document.getElementById('mascara').value; //pega valor da mascara digitada

            mascara_split = mascara.split("."); //fragmenta a imagem até cada ponto (.)

            if (mascara_split.length == 4) { //laço de verificação para ver se há 4 octetos
                let i = 0;
                let cont = 0;
                while (i < mascara_split.length) { //laço de repetição para ver quantos octetos são completos.
                    if (mascara_split[i] == 255) {
                        cont += 1;
                        i++;
                    } else {
                        i++
                    }
                }

                let x = 128;
                let check = 0;
                let quant_bit = 0;

                if (cont == 1) { //condição de parâmetro se a quantidade de octetos é igual a 1
                    this.classe_ip = "IP de Classe A";
                    while (check != mascara_split[1]) {
                        quant_bit += 1;
                        check += x;
                        x = x / 2;
                        console.log(quant_bit);
                    }
                    check = 0;
                    x = 128
                    while (check != mascara_split[2]) {
                        quant_bit += 1;
                        check += x;
                        x = x / 2;
                        console.log(quant_bit);
                    }
                    check = 0;
                    x = 128
                    while (check != mascara_split[3]) {
                        quant_bit += 1;
                        check += x;
                        x = x / 2;
                        console.log(quant_bit);
                    }
                    this.num_sub_redes = (Math.pow(2, quant_bit));

                } else if (cont == 2) { //condição de parâmetro se a quantidade de octetos é igual a 2
                    this.classe_ip = "IP de Classe B";
                    while (check != mascara_split[2]) {
                        quant_bit += 1;
                        check += x;
                        x = x / 2;
                        console.log(quant_bit);
                    }
                    check = 0;
                    x = 128
                    while (check != mascara_split[3]) {
                        quant_bit += 1;
                        check += x;
                        x = x / 2;
                        console.log(quant_bit);
                    }
                    this.num_sub_redes = (Math.pow(2, quant_bit));

                } else if (cont == 3) { //condição de parâmetro se a quantidade de octetos é igual a 3
                    this.classe_ip = "IP de Classe C";

                    while (check != mascara_split[3]) {
                        quant_bit += 1;
                        check += x;
                        x = x / 2;
                        console.log(quant_bit);
                    }
                    this.num_sub_redes = (Math.pow(2, quant_bit));

                } else {
                    alert("Máscara Inválida");
                }
            }
            else {
                alert("Máscara Inválida");
            }

        },

        clear: function () {
            document.getElementById('mascara').value = "";
            this.classe_ip = "-";
            this.num_sub_redes = "-";
            this.num_hosts_validos = "-";
        }
    }
});

function teste(paramentro){
    if(paramentro == 1){
        alert(1);

    }else if(paramentro == 2){
        alert(2);
    }else if(paramentro == 3) {
        alert(3);
    }
}