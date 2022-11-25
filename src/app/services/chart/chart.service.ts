import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Overrides } from 'chart.js';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public bar_chart_option: ChartConfiguration['options'] = {
    font: {
      family: 'IBM Plex Sans'
    },
    animation: {
      easing: 'easeInOutElastic',
      delay: 25
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          borderColor: this.helperService.getColorVariable('light-shade'),
          color: this.helperService.getColorVariable('light')
        },
        ticks: {
          color: this.helperService.getColorVariable('medium'),
          font: {
            family: 'IBM Plex Sans',
            weight: '500'
          }
        }
      },
      y: {
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('light-shade'),
          color: this.helperService.getColorVariable('light')
        },
        ticks: {
          color: this.helperService.getColorVariable('medium'),
          font: {
            family: 'IBM Plex Sans',
            weight: '500'
          },
          callback: function (value, index, ticks) {
            return value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('light-tint'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('medium'),
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add currency format to tooltip
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' kWh';
            }
            return label;
          }
        }
      }
    }
  };

  public line_chart_option: ChartConfiguration['options'] = {
    font: {
      family: 'IBM Plex Sans'
    },
    animation: {
      easing: 'easeInOutElastic',
      delay: 25
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          borderColor: this.helperService.getColorVariable('light-shade'),
          color: this.helperService.getColorVariable('light')
        },
        ticks: {
          color: this.helperService.getColorVariable('medium'),
          font: {
            family: 'IBM Plex Sans',
            weight: '500'
          },
          maxTicksLimit: 24,
          callback: function (value, index, ticks) {
            return value + ' d';
          },
        }
      },
      y: {
        stacked: true,
        position: 'right',
        grid: {
          borderColor: this.helperService.getColorVariable('light-shade'),
          color: this.helperService.getColorVariable('light')
        },
        ticks: {
          color: this.helperService.getColorVariable('medium'),
          font: {
            family: 'IBM Plex Sans',
            weight: '500'
          },
          callback: function (value, index, ticks) {
            return value + ' kWh';
          },
          maxTicksLimit: 5
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('light-tint'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('medium'),
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add currency format to tooltip
          label: function (context) {
            var label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' kWh';
            }
            return label;
          }
        }
      }
    }
  };

  /*
  public doughnut_chart_option: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        align: 'start',
        labels: {
          padding: 12,
          boxWidth: 3,
          boxHeight: 3,
          font: {
            family: 'IBM Plex Sans'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        },
      },
      tooltip: {
        backgroundColor: this.helperService.getColorVariable('light-tint'),
        bodyColor: this.helperService.getColorVariable('primary'),
        titleColor: this.helperService.getColorVariable('medium'),
        titleFont: {
          size: 14,
          weight: 'normal'
        },
        bodyFont: {
          size: 16,
          weight: 'bold'
        },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
        boxPadding: 3,
        usePointStyle: true,
        callbacks: {
          // Add % format to tooltip
          label: function (context) {

            var data_index = context.dataIndex;
            var label = context.dataset.data[data_index];
            var label_name = label + '%';

            return label_name as any;
          }
        }
      }
    }
  }

  public half_doughnut_chart_option: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
        align: 'start',
        labels: {
          padding: 12,
          boxWidth: 3,
          boxHeight: 3,
          font: {
            family: 'IBM Plex Sans'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        },
      },
      tooltip: {
        enabled: false
      },
      title: {
        display: false
      }
    },
    cutout: '80%',
  }
  */

  public bar_chart_data: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  public line_chart_data: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  public doughnut_chart_data: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  public half_doughnut_chart_data: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  public bar_chart_type: ChartType = 'bar';
  public line_chart_type: ChartType = 'line';
  public doughnut_chart_type: ChartType = 'doughnut';
  public half_doughnut_chart_type: ChartType = 'doughnut';

  constructor(
    private helperService: HelperService
  ) { }
}
