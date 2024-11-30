<template>
  <div class="gauge-container">
    <canvas ref="gaugeChart"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { nextTick } from 'vue';

Chart.register(...registerables);

export default {
  name: 'GaugeChart',
  props: {
    maxValue: {
      type: Number,
      required: true
    },
    currentValue: {
      type: Number,
      required: true
    }
  },
  mounted() {
    nextTick(() => {
      this.renderGaugeChart();
    });
  },
  watch: {
    currentValue() {
      this.renderGaugeChart();
    },
    maxValue() {
      this.renderGaugeChart();
    }
  },
  methods: {
    renderGaugeChart() {
      const canvas = this.$refs.gaugeChart;
      if (!canvas) {
        console.error('Canvas não encontrado');
        return;
      }
      
      const ctx = canvas.getContext('2d');
      const percentage = (this.currentValue / this.maxValue) * 100;

      let color;
      let phrase;
      if (percentage <= 60) {
        color = '#FF5733'; // Vermelho
        phrase = "Este parâmetro está ruim, veja o que está acontecendo";
      } else if (percentage <= 80) {
        color = '#3399FF'; // Azul
        phrase = "Ótimo, sua medição está em um nível satisfatório";
      } else {
        color = '#4CAF50'; // Verde
        phrase = "Excelente, você está de parabéns";
      }

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [percentage, 100 - percentage],
            backgroundColor: [color, '#EEEEEE'],
            borderWidth: 0,
            cutout: '80%',
            rotation: -90,
            circumference: 180
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            beforeDraw: (chart) => {
              const width = chart.width;
              const height = chart.height;
              const ctx = chart.ctx;

              // Limpa o canvas antes de desenhar
              ctx.clearRect(0, 0, width, height);
              
              ctx.restore();

              // Cálculo do tamanho da fonte
              const fontSize = (height / 150).toFixed(2);
              ctx.font = `${fontSize}em sans-serif`;
              ctx.textBaseline = 'middle';
              ctx.textAlign = 'center';

              // Exibe a porcentagem
              const text = `${percentage.toFixed(1)}%`;
              ctx.fillText(text, width / 2, height / 2); // Centraliza a porcentagem

              // Exibe a frase
              ctx.font = '0.4em sans-serif'; // Tamanho reduzido para a frase
              ctx.fillText(phrase, width / 2, height / 1.5); // Ajuste a altura se necessário

              ctx.save();
            }
          }
        }
      });
    }
  }
}
</script>

<styl