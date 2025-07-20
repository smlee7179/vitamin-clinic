import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      used: process.memoryUsage(),
      total: os.totalmem(),
      free: os.freemem()
    },
    cpu: os.loadavg()
  });
}
