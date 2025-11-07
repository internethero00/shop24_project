import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/Chart'
import { IMonthlySales } from '@/shared/types/statistics.interface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import styles from './MiddleStatistics.module.css'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { formatPrice } from '@/utils/string/format-price'



const chartConfig = {value:
		{label: "Profit",
			color: '#3B82F6'
		}} satisfies ChartConfig



interface OverviewProps {
	data: IMonthlySales[]
}

export function Overview({data}: OverviewProps) {
	return <Card>
		<CardHeader className={styles.header}>
			<CardTitle>Profit</CardTitle>
		</CardHeader>
		<CardContent>
			<ChartContainer className='aspect-auto h-[310px] w-full' config={chartConfig}>
				<AreaChart data={data} accessibilityLayer margin={{left: 12, right: 12}}>
				<CartesianGrid vertical={false}/>
				<XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8}/>
				<ChartTooltip content={
					<ChartTooltipContent labelFormatter={formatPrice} indicator='line'/>
				}/>
					<Area dataKey='value' type='natural' fill='var(--color-value)' stroke='var(--color-value)'/>
				</AreaChart>
			</ChartContainer>
		</CardContent>
	</Card>
}