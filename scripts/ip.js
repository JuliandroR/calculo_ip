var Vue = new Vue({
    el: '#content',
    data: {
        ip: "-",
        validade_ip: "-",
        classe_ip: "-",
        mascara: "-",
        rede: "-",
        primeiro_host: "-",
        ultimo_host: "-",
        broadcast: "-",
        reservado: "-"
    },
    methods: {
        calc: function () {
            console.log("Rodou!");
            this.ip = document.getElementById('entrada').value;

            let ip_split = this.ip.split(".");

            if (ip_split.length != 4 
                || ip_split[0] > 255 
                || ip_split[1] > 255 
                || ip_split[2] > 255 
                || ip_split[3] > 255) {
                alert("Ip Inválido, ele não possui 4 (quatro) octetos válidos");
                this.validade_ip = false;
            } else {
                this.validade_ip = true;
                if (ip_split[0] > 0 && ip_split[0] < 127) {
                    this.classe_ip = "A";
                    this.mascara = "255.0.0.0";
                    this.rede = (ip_split[0] + ".0.0.0");
                    this.primeiro_host = (ip_split[0] + ".0.0.1");
                    this.ultimo_host = (ip_split[0] + ".255.255.254");
                    this.broadcast = (ip_split[0] + ".255.255.255");
                    if (ip_split[3] == 0) {
                        this.reservado = true;
                    } else {
                        this.reservado = false
                    }
                }

                if (ip_split[0] > 127 && ip_split[0] < 192) {
                    this.classe_ip = "B";
                    this.mascara = "255.255.0.0";
                    this.rede = (ip_split[0] + "." + ip_split[1] + ".0.0");
                    this.primeiro_host = (ip_split[0] + "." + ip_split[1] + ".0.1");
                    this.ultimo_host = (ip_split[0] + "." + ip_split[1] + ".255.254");
                    this.broadcast = (ip_split[0] + "." + ip_split[1] + ".255.255");
                    if (ip_split[3] == 0) {
                        this.reservado = true;
                    } else {
                        this.reservado = false
                    }
                }

                if (ip_split[0] > 191 && ip_split[0] < 224) {
                    this.classe_ip = "C";
                    this.mascara = "255.255.255.0";
                    this.rede = (ip_split[0] + "." + ip_split[1] + "." + ip_split[2] + ".0");
                    this.primeiro_host = (ip_split[0] + "." + ip_split[1] + "." + ip_split[2] + ".1");
                    this.ultimo_host = (ip_split[0] + "." + ip_split[1] + "." + ip_split[2] + ".254");
                    this.broadcast = (ip_split[0] + "." + ip_split[1] + "." + ip_split[2] + ".255");
                    if (ip_split[3] == 0) {
                        this.reservado = true;
                    } else {
                        this.reservado = false
                    }
                }

                if (ip_split[0] == 127) {
                    this.classe_ip = "IP de <i>Loopback</i>"
                    this.validade_ip = "-";
                    this.mascara = "-";
                    this.rede = "-";
                    this.primeiro_host = "-";
                    this.ultimo_host = "-";
                    this.broadcast = "-";
                    this.reservado = "-";
                }

                if (ip_split[0] > 223 && ip_split[0] < 240) {
                    this.classe_ip = "D"
                    this.mascara = "Sem Máscara, Destinado a Multicast"
                    this.validade_ip = "-";
                    this.rede = "-";
                    this.primeiro_host = "-";
                    this.ultimo_host = "-";
                    this.broadcast = "-";
                    this.reservado = "-";
                }

                if (ip_split[0] > 239 && ip_split[0] < 255) {
                    this.classe_ip = "E"
                    this.mascara = "Sem Máscara, Destinado a Teste"
                    this.validade_ip = "-";
                    this.rede = "-";
                    this.primeiro_host = "-";
                    this.ultimo_host = "-";
                    this.broadcast = "-";
                    this.reservado = "-";
                }
            }
        },

        clear: function () {
            document.getElementById('entrada').value = "";
            this.ip = "-";
            this.classe_ip = "-"
            this.mascara = "-"
            this.validade_ip = "-";
            this.rede = "-";
            this.primeiro_host = "-";
            this.ultimo_host = "-";
            this.broadcast = "-";
            this.reservado = "-";
        }
    }
})