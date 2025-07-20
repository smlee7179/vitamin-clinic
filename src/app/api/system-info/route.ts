import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  return NextResponse.json({
    platform: os.platform(),
    arch: os.arch(),
    version: os.release(),
    hostname: os.hostname(),
    cpus: os.cpus().length,
    memory: {
      total: Math.round(os.totalmem() / 1024 / 1024) + 'MB',
      free: Math.round(os.freemem() / 1024 / 1024) + 'MB'
    }
  });
}
