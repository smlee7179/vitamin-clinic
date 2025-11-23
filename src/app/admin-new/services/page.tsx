'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-new/AdminLayout';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <AdminLayout>
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-900 text-3xl font-bold tracking-tight">
            진료 과목 안내
          </p>
          <p className="text-gray-600 text-base font-normal leading-normal">
            진료 과목 및 서비스를 관리합니다.
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Treatments Card */}
        <Link
          href="/admin-new/treatments"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#f49d25]/10">
              <span className="material-symbols-outlined text-[#f49d25]" style={{ fontSize: '28px' }}>
                healing
              </span>
            </div>
            <h3 className="text-gray-900 text-lg font-bold">
              치료 소개 관리
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            통증 치료, 주사 치료 등 다양한 치료 항목을 관리할 수 있습니다.
          </p>
          <div className="mt-4 flex items-center text-[#f49d25] text-sm font-medium">
            <span>관리하기</span>
            <span className="material-symbols-outlined ml-1" style={{ fontSize: '16px' }}>
              arrow_forward
            </span>
          </div>
        </Link>

        {/* About Card */}
        <Link
          href="/admin-new/about"
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#f49d25]/10">
              <span className="material-symbols-outlined text-[#f49d25]" style={{ fontSize: '28px' }}>
                info
              </span>
            </div>
            <h3 className="text-gray-900 text-lg font-bold">
              병원 소개 관리
            </h3>
          </div>
          <p className="text-gray-600 text-sm">
            병원 소개, 의료진, 시설 안내 등을 관리할 수 있습니다.
          </p>
          <div className="mt-4 flex items-center text-[#f49d25] text-sm font-medium">
            <span>관리하기</span>
            <span className="material-symbols-outlined ml-1" style={{ fontSize: '16px' }}>
              arrow_forward
            </span>
          </div>
        </Link>
      </div>

      {/* Service Information */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 text-xl font-bold mb-4">
          진료 과목 안내 정보
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-gray-900 font-medium mb-2">주요 진료 과목</h4>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              <li>척추 통증 치료</li>
              <li>관절 통증 치료</li>
              <li>신경 차단술</li>
              <li>도수 치료</li>
              <li>체외충격파 치료</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              💡 <strong>안내:</strong> 진료 과목의 상세 내용은 "치료 소개 관리" 메뉴에서 관리할 수 있습니다.
              새로운 치료 항목을 추가하거나 기존 항목을 수정할 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-[#f49d25]/10 to-[#f49d25]/5 rounded-xl border border-[#f49d25]/20 p-6">
        <h3 className="text-gray-900 text-lg font-bold mb-4">
          빠른 작업
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin-new/treatments/create"
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#f49d25] transition-colors"
          >
            <span className="material-symbols-outlined text-[#f49d25]">add_circle</span>
            <span className="text-gray-900 font-medium text-sm">새 치료 항목 추가</span>
          </Link>
          <Link
            href="/admin-new/doctors"
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#f49d25] transition-colors"
          >
            <span className="material-symbols-outlined text-[#f49d25]">badge</span>
            <span className="text-gray-900 font-medium text-sm">의료진 관리</span>
          </Link>
          <Link
            href="/admin-new"
            className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#f49d25] transition-colors"
          >
            <span className="material-symbols-outlined text-[#f49d25]">dashboard</span>
            <span className="text-gray-900 font-medium text-sm">대시보드로 이동</span>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
