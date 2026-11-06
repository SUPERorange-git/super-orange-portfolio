(function(root){
  'use strict';
  const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const section=(title,body)=>'<section class="section"><h2>'+title+'</h2>'+body+'</section>';
  const list=items=>'<ol>'+items.map(x=>'<li><p>'+x+'</p></li>').join('')+'</ol>';
  function render(view,actor,state){
    const warning='<p class="notice">本地流程原型：未接入实名认证、电子签约或支付机构。请勿提交身份证、银行卡或支付密码。</p>';
    if(view==='trust'){
      const checks={merchant:['企业主体与经营状态','经办人身份及企业授权','行业所需资质与品牌展示授权'],student:['本人身份与有效学籍','作品归属、证书与赛事证明','团队成员关系及项目履约记录'],school:['学校或院系身份','管理员授权及合作范围','导师授权与实践成果证明'],admin:['审核材料完整性及来源','核验有效期、补件与复审','撤销、申诉及操作审计']};
      return '<h1>认证中心</h1>'+warning+section('当前状态','<p>未提交 · 真实核验服务未开通</p>')+section('核验清单',list(checks[actor.role]||[]))+section('认证流程',list(['提交必要材料并授权核验','审核中：记录核验方与证据来源','材料不足：说明原因并补件','通过后展示核验对象、日期、有效期及范围','过期复审；撤销可申诉']))+section('专业背书的边界','<p>身份已核验、专业证明和履约评价分别展示。学生所属学校不代表学校为项目担保；机构标识须获得展示授权。敏感原件不公开。</p>');
    }
    if(view==='wallet'){
      if(actor.role==='school')return '<h1>资金信息不开放</h1><p>学校端不查看个人收款账户与项目资金。</p>';
      const projects=state.projects.filter(p=>actor.role!=='student'||p.selected===actor.team);
      const totals=projects.reduce((a,p)=>{const m=Transactions.ledger(p);Object.keys(a).forEach(k=>a[k]+=m[k]);return a;},{paid:0,escrow:0,fee:0,received:0,refunded:0});
      const labels={paid:'模拟已支付',escrow:'模拟待结算',fee:'模拟已计服务费',received:'模拟负责人已结算',refunded:'模拟已退款'};
      return '<h1>资金中心</h1>'+warning+section('项目账目汇总','<dl>'+Object.keys(totals).map(k=>'<dt>'+labels[k]+'</dt><dd>¥'+(totals[k]/100).toFixed(2)+'</dd>').join('')+'</dl><p>以上为浏览器演示记录，不是支付机构余额，不可提现。</p>')+section('真实资金服务','<p>未开通。充值、余额留存及提现仅在支付机构批准相应产品后开放。</p><button class="btn" disabled>提现暂未开放</button>')+section('统一收款授权',list(['成员分别确认分工、收益比例、费用承担与分配期限。','全员确认项目统一收款负责人及授权版本。','每个阶段开始前核对负责人和脱敏收款信息。','更换负责人需重新授权，必要时签补充协议。','负责人自行分配成员报酬，成员独立确认收到；平台结算不等于成员到账。']))+section('提现账户确认',list(['仅允许核验通过且支付渠道支持的本人账户。','每次提现确认姓名、账号尾号、渠道、金额及费用，并验证身份。','已在途提现不可直接更换账户，重复申请不得重复扣款。','结果不明时保持处理中，核对渠道结果后再处理。']));
    }
    return '<h1>合作规则与流程</h1>'+warning+section('完整合作流程',list(['注册并完成身份与组织认证','发布需求，明确交付物、阶段及验收标准','成员确认分工、收益和统一收款授权后投标','选队沟通并固定合作范围','完成有效签约，保存协议版本与签署凭证','商家支付当期费用，渠道确认后开始执行','团队提交带版本号的作品，商家逐项验收','验收通过且无争议后扣除5%服务费并发起结算','负责人核对提现账户，到账后自行向成员分配','最终核对作品、资金、退款和票据，评价并另行授权案例']))+section('费用示例','<p>5,000元项目：阶段款500 / 2,000 / 2,500元；服务费25 / 100 / 125元；团队应结算475 / 1,900 / 2,375元。</p><p>服务费合计250元，团队合计4,750元。未含可能的渠道费及税费，承担方式须签约前确认。历史项目保留原约定费率。</p>')+section('异常处理',list(['验收逾期先提醒与协调，首期不自动放款。','新增需求需确认范围、价款与期限，不覆盖旧版本。','争议期间暂停相关结算，保留双方证据。','终止时逐阶段确认履约价值、应付款、退款及作品使用权。','未履约退款部分不收服务费；已结算款依渠道支持的程序处理退款。']));
  }
  root.CampusCenters={render};
})(globalThis);
