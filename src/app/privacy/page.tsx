export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. 개인정보의 처리 목적</h2>
            <p>비타민마취통증의학과의원은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
            <ul>
              <li>진료 서비스 제공</li>
              <li>환자 관리 및 상담</li>
              <li>의료진 소개 및 시설 안내</li>
            </ul>

            <h2>2. 개인정보의 처리 및 보유기간</h2>
            <p>개인정보는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 처리·보유합니다.</p>

            <h2>3. 개인정보의 제3자 제공</h2>
            <p>개인정보는 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
            <ul>
              <li>정보주체가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>

            <h2>4. 정보주체의 권리·의무 및 그 행사방법</h2>
            <p>정보주체는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
            <ul>
              <li>개인정보 열람요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제요구</li>
              <li>처리정지 요구</li>
            </ul>

            <h2>5. 개인정보의 안전성 확보 조치</h2>
            <p>개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다.</p>
            <ul>
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보에 대한 접근 제한</li>
            </ul>

            <h2>6. 개인정보 보호책임자</h2>
            <p>개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>개인정보 보호책임자</strong></p>
              <p>성명: 김철수</p>
              <p>직책: 원장</p>
              <p>연락처: 051-469-7581</p>
            </div>

            <h2>7. 개인정보 처리방침 변경</h2>
            <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
            
            <div className="mt-8 pt-8 border-t">
              <p><strong>시행일자:</strong> 2024년 1월 1일</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 