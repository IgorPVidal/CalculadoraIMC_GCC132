import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    var mensagem = '';
    var msg_classificacao = this.classificateIMC(imc);
    if (msg_classificacao) {
      mensagem = `IMC = ${imc.toFixed(2)}\n`;
      msg_classificacao = `Classificação: ${msg_classificacao}`;
    } else {
      msg_classificacao = 'Erro ao calcular IMC.\nCertifique-se de que os valores de Peso e Altura são números maiores que zero (0).';
    }
    mensagem += `${msg_classificacao}`;
    this.showMessage(mensagem);
  }

  classificateIMC(imc: number) {
    var classificacao = '';
    // Testes consideram a terceira casa decimal para maior coerência na impressão.
    // Evita que um IMC = 18.495, que se torna um 18.5 na impressão, seja classificado como "Magreza",
    // por exemplo.
    if (imc < 18.495) { 
      classificacao = 'Magreza';
    } else if (imc < 24.995) {
      classificacao = 'Normal';
    } else if (imc < 29.995) {
      classificacao = 'Sobrepeso';
    } else if (imc <= 39.995) {
      classificacao = 'Obesidade';
    } else if (imc > 39.995) {
      classificacao = 'Obesigade Grave';
    } else {
      // considerando a possibilidade desta função vir a ser utilizada em algum lugar 
      // que não confere a validade do IMC.
      classificacao = null;
    }
    return classificacao;
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
