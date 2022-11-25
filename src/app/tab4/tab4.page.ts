import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
    
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    public line_chart_option: ChartConfiguration['options'] = this.chartService.line_chart_option;
    public line_chart_data: ChartData<'line'> = this.chartService.line_chart_data;
    public line_chart_type: ChartType = this.chartService.line_chart_type;

    timescale: string = 'day';

    constructor(
        private chartService: ChartService,
        private helperService: HelperService
    ) { }

    ngOnInit() {

        // Create line chart
        this.createLineChart(this.timescale);


        // Custom options
        this.chartService.line_chart_option.scales['y']['display'] = true;
        this.chartService.line_chart_option.scales['x']['display'] = true;
        this.chartService.line_chart_option.scales.y.ticks = {
        color: this.helperService.getColorVariable('medium'),
        font: {
            family: 'IBM Plex Sans',
            weight: '500'
        },
        callback: function (value, index, ticks) {
            return value + ' h';
        },
        maxTicksLimit: 3
        };
        this.line_chart_option.plugins.legend = {
        display: false
        };
    }

    // Change timescale
    changeTimescale(event: any) {
        this.timescale = event.detail.value;
        this.createLineChart(this.timescale);
        this.chart.update();
    }

    // Create line chart
    createLineChart(timescale: string) {

        let helperService = this.helperService;

        let val_max_1 = 0;
        let val_max_2 = 0;

        switch (timescale) {
        /*case 'day':
            val_max_1 = 3;
            val_max_2 = 19;
            break;
            */
        case 'week':
            val_max_1 = 12;
            val_max_2 = 10;
            break;
        /*case 'month':
            val_max_1 = 22;
            val_max_2 = 80;
            break;
        case 'year':
            val_max_1 = 2000;
            val_max_2 = 6000;
            break;
            */
        }

        // Random array of numbers
        let rand_numbers_1 = [...Array(8)].map(e => Math.random() * val_max_1 | 0);
        let rand_numbers_2 = [...Array(8)].map(e => Math.random() * val_max_2 | 0);

        // Set labels
        this.line_chart_data.labels = Array.from(Array(8).keys());

        // Set datasets
        this.line_chart_data.datasets = [
        {
            data: rand_numbers_1,
            pointRadius: 0,
            tension: 0.5,
            fill: true,
            backgroundColor: function (context) {

            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
                // This case happens on initial chart load
                return null;
            }

            // Create gradient
            return helperService.createGradientChart(ctx, 'secondary', 'secondary', .5);
            },
            pointBackgroundColor: helperService.getColorVariable('secondary'),
            borderColor: helperService.getColorVariable('secondary'),
            borderWidth: 2
        },
        { 
            data: rand_numbers_2,
            pointRadius: 0,
            tension: 0.5,
            fill: true,
            backgroundColor: function (context) {

            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
                // This case happens on initial chart load
                return null;
            }

            // Create gradient
            return helperService.createGradientChart(ctx, 'tertiary', 'tertiary', .5);
            },
            pointBackgroundColor: helperService.getColorVariable('tertiary'),
            borderColor: helperService.getColorVariable('tertiary'),
            borderWidth: 2
        }
        ];
    }

}