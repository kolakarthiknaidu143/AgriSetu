import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface TrendItem {
  day: string;
  price: number;
  arrivalsTonnes?: number;
  minPrice?: number;
  maxPrice?: number;
}

interface MarketTrendChartProps {
  data: TrendItem[];
  cropName: string;
}

export const MarketTrendChart: React.FC<MarketTrendChartProps> = ({ data, cropName }) => {
  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-sm text-stone-500">No trend data available.</div>;
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" stroke="#78716c" fontSize={12} tickLine={false} />
          <YAxis
            yAxisId="left"
            stroke="#047857"
            fontSize={12}
            tickLine={false}
            tickFormatter={(val) => `₹${val}`}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#d97706"
            fontSize={11}
            tickLine={false}
            tickFormatter={(val) => `${val}t`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e7e5e4',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px'
            }}
            formatter={(value: any, name: string) => {
              if (name === 'Modal Price' || name === 'Max Price' || name === 'Min Price') {
                return [`₹${Number(value).toLocaleString('en-IN')}/qtl`, name];
              }
              if (name === 'Arrivals') {
                return [`${value} Tonnes`, name];
              }
              return [value, name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar
            yAxisId="right"
            dataKey="arrivalsTonnes"
            name="Arrivals"
            fill="#fed7aa"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="maxPrice"
            name="Max Price"
            stroke="#10b981"
            strokeDasharray="4 4"
            dot={false}
            strokeWidth={1.5}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            name="Modal Price"
            stroke="#047857"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#047857' }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="minPrice"
            name="Min Price"
            stroke="#94a3b8"
            strokeDasharray="4 4"
            dot={false}
            strokeWidth={1.5}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
