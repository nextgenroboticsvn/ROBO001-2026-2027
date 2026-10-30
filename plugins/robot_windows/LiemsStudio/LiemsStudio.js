(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const locale = window.LiemsLocale;
  const protocol = window.LiemsProtocol;
  Object.assign(locale.page.vi,{
    codeStudio:'Lập trình robot',codeSubtitle:'Từng khối lệnh. Một ý tưởng mới.',offline:'Bản thử · Chưa kết nối Webots',
    estimatedTime:'Dự kiến thời gian chạy thử mô phỏng:',loopProject:'Thử khối lặp',
    categoryDynamic:'Tuỳ chương trình',groupsCount:'{count} nhóm',guideIllustration:'Robot và đường đi',
    currentProject:'Chương trình đang mở',lockedGripperLabel:'Sắp có · Gắp / thả vật',
    cabiOffline:'Góp ý tại chỗ · Chưa kết nối API',cabiTitle:'Cùng cải thiện bài của bạn',
    cabiDescription:'Mình xem các khối bạn đang ghép và gợi ý một bước để bạn thử tiếp nhé.',
    cabiReview:'Góp ý bài này',cabiInputLabel:'Câu hỏi của bạn',cabiSend:'Hỏi',
    cabiPlaceholder:'Ví dụ: Khối lặp trong bài này hoạt động thế nào?',
    cabiSuggestion1:'Gợi ý cải thiện',cabiSuggestion2:'Giải thích khối lặp',cabiSuggestion3:'Bước tiếp theo?',
    cabiContext:'{name} · {count} khối lệnh',cabiUpdated:'Các khối đã đổi. Bấm “Góp ý bài này” để xem lại.',
    availableLocked:'{available} dùng được · {locked} khóa',
    raiseArm:'Nâng tay gắp thêm {height} mm',lowerArm:'Hạ tay gắp bớt {height} mm',
    walkErrorHeight:'Quãng nâng/hạ cần là số mm không âm.',
    resetUnconfirmed:'Chưa nhận được trạng thái sau Reset. Kiểm tra Webots.',
    moveForward:'Đi tới · tốc độ {speed}%',moveBackward:'Đi lùi · tốc độ {speed}%',
    turnLeft:'Rẽ trái · tốc độ {speed}%',turnRight:'Rẽ phải · tốc độ {speed}%',
    waitStep:'Chờ {seconds} giây',repeatStep:'Vòng lặp {current}/{total}',
    backendState:'Trạng thái Webots: {state}',pausePending:'Đã gửi yêu cầu tạm dừng Webots.',
    walkErrorNumber:'Chạy thử cần giá trị là một số hữu hạn.',walkErrorSteps:'Bản thử giới hạn 200 bước. Giảm số lần lặp nhé.',
    walkErrorDepth:'Bản thử hỗ trợ tối đa 8 tầng lặp.',walkErrorSpeed:'Tốc độ phải từ 0 đến 100%.',
    walkErrorWait:'Bản thử hỗ trợ chờ từ 0 đến 10 giây.',walkErrorRepeat:'Bản thử hỗ trợ lặp từ 0 đến 20 lần.',
    walkErrorUnsupported:'Khối này cần Webots. Bản thử hỗ trợ di chuyển, nâng/hạ tay, chờ và lặp.',
    walkErrorStart:'Ghép các khối thành một chương trình dưới “Bắt đầu chương trình”.'
  });
  Object.assign(locale.page.en,{
    codeStudio:'Program your robot',codeSubtitle:'One block. A new idea.',offline:'Preview · Webots not connected',
    estimatedTime:'Estimated simulation run time:',loopProject:'Explore repeat blocks',
    categoryDynamic:'Depends on program',groupsCount:'{count} groups',guideIllustration:'Robot and its path',
    currentProject:'Current program',lockedGripperLabel:'Coming soon · Grip / release',
    cabiOffline:'Local guidance · API not connected',cabiTitle:'Let’s improve your program',
    cabiDescription:'I can look at your blocks and suggest one next step for you to try.',
    cabiReview:'Review my program',cabiInputLabel:'Your question',cabiSend:'Ask',
    cabiPlaceholder:'For example: How does the repeat block work here?',
    cabiSuggestion1:'Suggest an improvement',cabiSuggestion2:'Explain repeat blocks',cabiSuggestion3:'What can I try next?',
    cabiContext:'{name} · {count} blocks',cabiUpdated:'Your blocks have changed. Select “Review my program” to refresh.',
    availableLocked:'{available} available · {locked} locked',
    raiseArm:'Raise gripper arm by {height} mm',lowerArm:'Lower gripper arm by {height} mm',
    walkErrorHeight:'Arm movement distance must be a non-negative number of mm.',
    resetUnconfirmed:'No status received after Reset. Check Webots.',
    moveForward:'Go forward · speed {speed}%',moveBackward:'Go backward · speed {speed}%',
    turnLeft:'Turn left · speed {speed}%',turnRight:'Turn right · speed {speed}%',
    waitStep:'Wait {seconds} seconds',repeatStep:'Repeat {current}/{total}',
    backendState:'Webots state: {state}',pausePending:'Pause request sent to Webots.',
    walkErrorNumber:'Preview values must be finite numbers.',walkErrorSteps:'The preview supports up to 200 steps. Try fewer repeats.',
    walkErrorDepth:'The preview supports up to 8 nested repeats.',walkErrorSpeed:'Speed must be between 0 and 100%.',
    walkErrorWait:'Preview waits must be between 0 and 10 seconds.',walkErrorRepeat:'Repeat count must be a whole number between 0 and 20.',
    walkErrorUnsupported:'This block requires Webots. Preview supports movement, arm lifting, waits and repeats.',
    walkErrorStart:'Connect your blocks into one program under “Start program”.'
  });
  Object.assign(locale.page.vi,{
    offline:'Chưa kết nối Webots',uploadRun:'Nạp & chạy',pause:'Tạm dừng',resume:'Tiếp tục',runIdle:'Mở bài hoặc ghép khối, rồi bấm Nạp & chạy trong Webots.',
    connectedReady:'Đã kết nối Webots. Mở hoặc ghép bài rồi bấm “Nạp & chạy”.',
    pausedProgram:'Đã gửi yêu cầu tạm dừng. Bấm Tiếp tục để chạy tiếp chương trình đã nạp.',
    resumePending:'Đã gửi yêu cầu tiếp tục chương trình đã nạp.',
    unloadedProgram:'Webots đang ở trạng thái chờ; code đã nạp được gỡ sau Reset.',
    settings:'Tùy chọn',editWorkspace:'Chỉnh sửa khối lệnh',undo:'Hoàn tác',redo:'Làm lại',clearWorkspace:'Xóa các khối',
    settingsHint:'Đổi màu và ngôn ngữ giữ nguyên bài đang mở. Các nút chỉnh sửa chỉ thay đổi bài Blockly.',
    projectsTitle:'Mở chương trình',projectsDescription:'Các tệp đã lưu theo robot và những bài mẫu để khám phá.',
    newProject:'Tạo bài mới',yourFiles:'TỆP CỦA BẠN',sampleFiles:'BÀI MẪU',
    originalTestHint:'Bài mẫu di chuyển và nâng/hạ tay gắp.',originalSensorHint:'Bài mẫu rẽ theo cảm biến khoảng cách.',
    saveAs:'Lưu thành bản sao',chooseFileName:'Bạn có thể chọn tên mới cho bản sao của mình.',cancel:'Hủy',continueAction:'Tiếp tục',
    replaceTitle:'Mở bài khác?',replaceHint:'Bài hiện tại có thay đổi chưa lưu. Lưu bài trước, hoặc tiếp tục để mở bài đã chọn.',
    overwriteTitle:'Lưu đè tệp?',overwriteHint:'Đã có tệp “{name}”. Tiếp tục sẽ lưu bài hiện tại vào tệp này.',
    deleteTitle:'Xóa tệp đã lưu?',deleteHint:'Xóa “{name}” khỏi danh sách tệp đã lưu? Bài đang mở vẫn giữ nguyên.',deleteSuccess:'Đã xóa tệp khỏi danh sách.',
    pin:'Ghim tệp {name}',unpin:'Bỏ ghim tệp {name}',deleteFile:'Xóa tệp {name}',
    clearHint:'Các khối trong bài đang mở sẽ được xóa. Bạn có thể Hoàn tác để lấy lại.',
    importXml:'Nhập XML',exportXml:'Xuất XML',exportSuccess:'Đã xuất bài Blockly thành tệp XML.',
    xmlContent:'Nội dung XML',chooseXml:'Chọn tệp XML',copyXml:'Sao chép XML',downloadXml:'Tải tệp XML',xmlImportHint:'Dán XML của bài Blockly, hoặc chọn một tệp từ máy.',xmlExportHint:'Sao chép XML để chuyển bài giữa preview và Webots. Bạn cũng có thể tải xuống thành tệp.',xmlCopySuccess:'Đã sao chép XML.',xmlCopyFallback:'XML đã được chọn. Nhấn Ctrl+C để sao chép.',
    importPreview:'Mở bài từ preview: {name}',xmlLimit:'Chọn tệp XML nhỏ hơn 2 MB nhé.',unknownBlock:'Tệp có khối chưa được nhận diện. Bài hiện tại được giữ nguyên.',
    detachedTail:'Phần sau khối dừng được giữ thành một chuỗi riêng. Bạn có thể nối lại ở vị trí phù hợp.',
    draftFailure:'Bản nháp chưa mở được. Các tệp đã lưu vẫn giữ nguyên.',lines:'{count} dòng',
    previewNote:'Trong Webots, “Nạp & chạy” điều khiển robot thật trong mô phỏng. Reset gỡ code đã nạp và đưa robot về trạng thái ban đầu, giữ bài Blockly.',
    help1:'Kéo khối từ bên trái và ghép thành chuỗi. Có thể mở bài mẫu trong mục Mở.',
    help2:'Bấm Nạp & chạy để gửi bài sang Webots. Tạm dừng / Tiếp tục giữ lượt chạy đã nạp.',
    help3:'Reset gỡ code và đưa robot về vị trí ban đầu. Đồng hồ vẫn hiển thị thời gian của world.',
    help4:'Lưu giữ bài theo robot. Dùng Xuất / Nhập XML để chuyển bài từ preview sang Robot Window.',
    results:'Trạng thái mô phỏng',pythonNote:'Python được sinh từ bài Blockly hiện tại.',pythonFooter:'UTF-8 · Python 3',
    guideStep3:'Nạp và chạy trong Webots',guideStep3Hint:'Quan sát robot làm theo thứ tự các khối.',
    estimatedHint:'Tổng thời gian các khối chờ; các bài có cảm biến, nhánh hoặc tay nâng chưa thể ước tính đầy đủ.'
  });
  Object.assign(locale.page.en,{
    offline:'Webots not connected',uploadRun:'Upload & run',pause:'Pause',resume:'Resume',runIdle:'Open or build a program, then choose Upload & run in Webots.',
    connectedReady:'Connected to Webots. Open or build a program, then choose Upload & run.',
    pausedProgram:'Pause requested. Choose Resume to continue the uploaded program.',
    resumePending:'Resume requested for the uploaded program.',
    unloadedProgram:'Webots is idle; the uploaded code is unloaded after Reset.',
    settings:'Options',editWorkspace:'Edit blocks',undo:'Undo',redo:'Redo',clearWorkspace:'Clear blocks',
    settingsHint:'Changing the theme or language keeps your program. Editor actions only change the Blockly workspace.',
    projectsTitle:'Open program',projectsDescription:'Saved files for this robot and sample programs to explore.',
    newProject:'New program',yourFiles:'YOUR FILES',sampleFiles:'SAMPLES',
    originalTestHint:'Sample program for motion and raising/lowering the arm.',originalSensorHint:'Sample program for turning with a distance sensor.',
    saveAs:'Save a copy',chooseFileName:'Choose a new name for your copy.',cancel:'Cancel',continueAction:'Continue',
    replaceTitle:'Open another program?',replaceHint:'The current program has unsaved changes. Save it first, or continue to open the selected program.',
    overwriteTitle:'Overwrite file?',overwriteHint:'“{name}” already exists. Continue to save your current program to this file.',
    deleteTitle:'Delete saved file?',deleteHint:'Remove “{name}” from saved files? The open program will be kept.',deleteSuccess:'File removed from the list.',
    pin:'Pin file {name}',unpin:'Unpin file {name}',deleteFile:'Delete file {name}',
    clearHint:'The open program’s blocks will be cleared. You can Undo to restore them.',
    importXml:'Import XML',exportXml:'Export XML',exportSuccess:'Blockly program exported as XML.',
    xmlContent:'XML content',chooseXml:'Choose XML file',copyXml:'Copy XML',downloadXml:'Download XML',xmlImportHint:'Paste your Blockly XML, or choose a file from your computer.',xmlExportHint:'Copy XML to move your program between the preview and Webots, or download it as a file.',xmlCopySuccess:'XML copied.',xmlCopyFallback:'XML selected. Press Ctrl+C to copy.',
    importPreview:'Open from preview: {name}',xmlLimit:'Choose an XML file smaller than 2 MB.',unknownBlock:'The file has an unrecognized block. Your current program is kept.',
    detachedTail:'Blocks after stop moving were kept as a separate stack. Reconnect them where appropriate.',
    draftFailure:'The draft could not be opened. Saved files are kept.',lines:'{count} lines',
    previewNote:'In Webots, Upload & run controls the simulated robot. Reset unloads the code and restores the initial robot state, keeping your Blockly program.',
    help1:'Drag blocks from the left and connect them. You can open sample programs from Open.',
    help2:'Choose Upload & run to send your program to Webots. Pause / Resume keeps the uploaded run.',
    help3:'Reset unloads code and restores the initial robot position. The clock keeps the world time.',
    help4:'Save keeps programs for this robot. Export / Import XML moves a preview program to the Robot Window.',
    results:'Simulation status',pythonNote:'Python generated from your current Blockly program.',pythonFooter:'UTF-8 · Python 3',
    guideStep3:'Upload and run in Webots',guideStep3Hint:'Watch the robot follow the blocks in order.',
    estimatedHint:'Total wait-block duration; sensors, branches and arm lift can add unknown run time.'
  });

  Object.assign(locale.page.vi,{
    files:'Tệp',run:'Chạy',uploadRun:'Chạy',projectsTitle:'Tệp và bài mẫu',running:'Đang chạy',paused:'Tạm dừng',
    worldReset:'Reset World',worldResetTooltip:'Đặt lại cả world về 00:00.00, giữ trạng thái chạy hoặc dừng và giữ bài Blockly.',
    worldResetUnavailable:'Reset World cần controller được cập nhật và kết nối Webots.',
    worldResetPending:'Đang chờ Webots đặt lại world…',worldResetDoneRunning:'World đã về 00:00.00 và tiếp tục chạy. Bài Blockly được giữ lại.',
    worldResetDonePaused:'World đã về 00:00.00 và vẫn dừng. Bấm Chạy để nạp bài và bắt đầu.',
    worldResetUnconfirmed:'Chưa nhận được xác nhận Reset World. Kiểm tra Webots.',
    cabiReset:'Bắt đầu lại',cabiResetTooltip:'Xóa câu hỏi và câu trả lời CabiBot; giữ bài Blockly.',
    traceWaiting:'Đã gửi bài. Đang chờ lệnh đang chạy từ Webots.',traceDone:'Đã thực hiện xong {count} bước.',traceHistory:'Đang xem các bước đã chạy',following:'Đang xem các bước',
    traceInterrupted:'Lượt chạy đã dừng hoặc được thay bằng bài khác.',traceUnsupported:'Controller này chưa gửi bước chạy. Khởi động lại controller đã cập nhật để xem block sáng.',
    traceStepOnly:'Bước {index}',traceEdited:'Bài đã thay đổi; bước chạy thuộc bản đã nạp.',tracePaused:'Tạm dừng · {action}',
    connectionRunning:'Webots · Đang chạy',connectionPaused:'Webots · Đã dừng',connectionReady:'Webots · Đã kết nối',
    genericLiveBlock:'Thực hiện khối lệnh',loopLive:'Lặp lại',ifLive:'Xét điều kiện',whileLive:'Kiểm tra vòng lặp',
    stopRobotLive:'Dừng robot và hạ tay',endLive:'Kết thúc chương trình',functionLive:'Thực hiện hàm {name}',
    traceProgress:'Bước {index} / {count}',sound:'Âm thanh ghép / xóa khối',soundHint:'Bật âm thanh ngắn của Blockly. Trình duyệt cho phép phát sau thao tác đầu tiên.',
    runIdle:'Mở bài hoặc ghép khối, rồi bấm Chạy.',connectedReady:'Đã kết nối Webots. Mở bài hoặc ghép khối rồi bấm Chạy.',
    help1:'Kéo khối từ bên trái và ghép thành chuỗi, hoặc mở bài mẫu trong Tệp.',
    help2:'Bấm Chạy để gửi bài sang Webots. Khối sáng theo lệnh đang thực thi; Tạm dừng / Tiếp tục giữ lượt chạy.',
    help3:'Reset đặt lại robot và gỡ code. Reset World đặt lại cả thế giới về 00:00.00 và giữ trạng thái chạy/dừng.',
    previewNote:'Chế độ xem trước chỉ đọc thứ tự lệnh. Trong Webots, Chạy nạp bài vào robot; các block sáng từ phản hồi thực thi.'
  });
  Object.assign(locale.page.en,{
    files:'Files',run:'Run',uploadRun:'Run',projectsTitle:'Files & samples',running:'Running',paused:'Paused',
    worldReset:'Reset World',worldResetTooltip:'Reset the world to 00:00.00, preserving its running or paused mode and your Blockly program.',
    worldResetUnavailable:'Reset World needs the updated robot controller and a Webots connection.',
    worldResetPending:'Waiting for Webots to reset the world…',worldResetDoneRunning:'World reset to 00:00.00 and resumed. Your Blockly program is kept.',
    worldResetDonePaused:'World reset to 00:00.00 and remains paused. Press Run to upload and start your program.',
    worldResetUnconfirmed:'Reset World has not been confirmed. Check Webots.',
    cabiReset:'Start over',cabiResetTooltip:'Clear the CabiBot question and answer, keeping your Blockly program.',
    traceWaiting:'Program sent. Waiting for execution steps from Webots.',traceDone:'Finished executing {count} steps.',traceHistory:'Reviewing executed steps',following:'Reviewing steps',
    traceInterrupted:'This run was stopped or replaced with another program.',traceUnsupported:'This controller does not report execution steps. Restart the updated controller to highlight running blocks.',
    traceStepOnly:'Step {index}',traceEdited:'The workspace changed; execution refers to the uploaded version.',tracePaused:'Paused · {action}',
    connectionRunning:'Webots · Running',connectionPaused:'Webots · Paused',connectionReady:'Webots · Connected',
    genericLiveBlock:'Execute block',loopLive:'Repeat',ifLive:'Evaluate condition',whileLive:'Check loop',
    stopRobotLive:'Stop robot and lower arm',endLive:'End program',functionLive:'Execute function {name}',
    traceProgress:'Step {index} / {count}',sound:'Block connection / deletion sounds',soundHint:'Enable short Blockly sounds. Playback is allowed after the first user interaction.',
    runIdle:'Open or build a program, then press Run.',connectedReady:'Connected to Webots. Open or build a program, then press Run.',
    help1:'Drag blocks from the left and connect them, or open a sample from Files.',
    help2:'Press Run to send your program to Webots. Blocks highlight from execution feedback; Pause / Resume keeps the current run.',
    help3:'Reset restores the robot and unloads code. Reset World restores the whole world to 00:00.00 and preserves running/paused mode.',
    previewNote:'Browser preview only reads command order. In Webots, Run uploads to the robot; block highlights use real execution feedback.'
  });

  const params=new URLSearchParams(location.search);
  const previewMode=params.get('preview')==='1';
  const robotName=params.get('name')||'default';
  const STORAGE_PREFIX='webots_project_'+robotName+'_';
  const STAR_KEY='webots_starred_files_'+robotName;
  const DRAFT_KEY='liems_studio_draft_'+robotName;
  const PROJECT_KEY='liems_design_preview_v1';
  const PREFERENCES_KEY = 'liems_studio_preferences_v1';
  const settings = readStorage(PREFERENCES_KEY) || {};
  let language = settings.language === 'en' ? 'en' : 'vi';
  let theme = ['light','dark','kimbie','monokai'].includes(settings.theme)?settings.theme:'light';
  let paused=false, lastCode='', confirmCallback=null;
  let presentationChanging = false;
  let currentExample = 'first', projectIsPreset = true, cleanName = '', cleanXml = '', cleanLabel = 'example';
  let toastTimer, toastState = null;
  let connected = false, connecting = false, robotWindow = null, programState = 'noCode', resetPending = false;
  let simulationState = null, worldPlaying = null, worldResetPending = false;
  let capabilities = {trace:false,worldReset:false}, worldResetTimer;
  const execution = window.LiemsStudioExecution.create();
  const tracePresentation = window.LiemsStudioExecution.createPresentation(function(frame){
    const block=frame.current&&workspace.getBlockById(frame.current.id);
    workspace.highlightBlock(frame.phase==='running'&&block&&block.type===frame.current.type&&frame.summary.xml===workspaceXml?block.id:null);
    renderResult();
  });
  const lessons = window.LiemsStudioLessons;
  let currentLesson = null, lessonOrigin = 'manual', templateEditing = false;
  const LESSON_KEY = 'liems_studio_lessons_'+robotName;
  let soundEnabled = settings.sound !== false;
  let runTimer, resetTimer, isRunning = false, runSteps = [], runIndex = 0;
  let resultState = {key:'runIdle',args:{}}, resultBadge = 'ready';
  let estimate = null;
  let workspaceXml = '';
  let cabiSnapshot = null, cabiQuestion = '', cabiStale = false;

  function readStorage(key) { try { return JSON.parse(localStorage.getItem(key)); } catch (error) { return null; } }
  function saveSettings() { try { localStorage.setItem(PREFERENCES_KEY,JSON.stringify({language,theme,sound:soundEnabled})); } catch (error) { /* UI remains usable without storage. */ } }
  function t(key,args) { if(key==='blocksCount'&&language==='en'&&args&&args.count===1)return '1 block';return locale.t(key,args,language); }
  function toast(key,args) {
    clearTimeout(toastTimer);const toastHost=document.activeElement&&document.activeElement.closest('dialog[open]')||document.body;toastHost.appendChild($('toast')); toastState={key,args}; $('toast').textContent=t(key,args); $('toast').hidden=false;
    toastTimer=setTimeout(()=>{$('toast').hidden=true;toastState=null;},3600);
  }
  function state(key,args) { resultState={key,args:args||{}}; renderResult(); }
  function renderResult() {
    const live=tracePresentation.get()||execution.get();
    const actual=execution.get();
    const reviewing=Boolean(actual&&actual.phase==='end'&&live&&live.phase==='running');
    let text=t(resultState.key,resultState.args)+(isRunning?' · '+t('stepProgress',{index:runIndex,count:runSteps.length}):'');
    let shownEstimate=estimate;
    if(live){
      if(['waiting','running'].includes(live.phase))shownEstimate=live.summary.seconds;
      if(live.phase==='running'){
        let action=live.current?t(live.current.key,live.current.args):t('traceWaiting');
        const progress=live.summary.totalSteps===null?t('traceStepOnly',{index:live.step}):t('traceProgress',{index:live.step,count:live.summary.totalSteps});
        text=(paused?t('tracePaused',{action}):action)+' · '+progress;
        if(live.summary.xml!==workspaceXml)text+=' · '+t('traceEdited');
      } else if(live.phase==='waiting')text=t('traceWaiting');
      else if(live.phase==='end')text=t('traceDone',{count:live.step});
      else if(live.phase==='error')text=t('backendError',{message:live.message});
      else if(live.phase==='interrupted')text=t('traceInterrupted');
    }
    $('runStatus').textContent=reviewing?t('traceHistory')+' · '+text:text;
    const shownBadge=reviewing?'following':live?(['waiting','running'].includes(live.phase)?(paused?'paused':'running'):'ready'):resultBadge;
    $('runBadge').textContent=t(shownBadge);
    $('runBadge').classList.toggle('running',isRunning||resetPending||shownBadge==='running');
    $('runStatus').dataset.runProgress=String(live?live.step:runIndex);
    $('runStatus').dataset.runActive=String(isRunning||Boolean(live&&['waiting','running'].includes(live.phase)));
    $('runTime').textContent=shownEstimate===null?t('estimateUnknown'):new Intl.NumberFormat(language==='vi'?'vi-VN':'en-US',{maximumFractionDigits:2}).format(shownEstimate)+' '+t('seconds');
  }
  function renderConnection() {
    $('connectionStatus').classList.toggle('connected',connected);
    $('connectionStatus').dataset.state=connected?(worldPlaying===false?'paused':'connected'):(connecting?'waiting':'offline');
    $('connectionLabel').textContent=connected?t(worldPlaying===null?'connectionReady':worldPlaying?'connectionRunning':'connectionPaused'):(connecting?t('connectionWaiting'):t('offline'));
    $('runButtonLabel').textContent=t(previewMode&&!connected?'run':'uploadRun');
    updatePlayButton();
    $('webotsClock').title=t(connected?'webotsTime':'clockHint');
  }
  function applyPageText() {
    document.documentElement.lang=language;
    updateProjectTitle();
    document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
    document.querySelectorAll('[data-i18n-title]').forEach(el=>el.title=t(el.dataset.i18nTitle));
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
    const injection=$('blocklyDiv').querySelector('.injectionDiv');
    if(injection)injection.setAttribute('aria-label',Blockly.Msg.WORKSPACE_ARIA_LABEL);
    $('langVi').className=language==='vi'?'lang-current':'lang-other';
    $('langEn').className=language==='en'?'lang-current':'lang-other';
    $('themeLabel').textContent=['light','dark'].includes(theme)?t(theme):theme==='kimbie'?'Kimbie':'Monokai';
    $('themeSelect').value=theme;
    $('themeToggle').setAttribute('aria-pressed',String(theme!=='light'));
    $('themeToggle').title=t('theme');
    $('languageToggle').title=t('language');
    renderConnection(); renderResult(); updateDirtyState();
    if(toastState) $('toast').textContent=t(toastState.key,toastState.args);
    if($('projectsDialog').open)renderFiles();
    renderLesson();renderCabiAdvice();updatePlayButton();
  }

  window.LiemsStudioCompat.install(Blockly,language);
  window.LiemsPreviewBlocks.install(Blockly);
  window.LiemsPreviewRenderer.install(Blockly);
  locale.install(Blockly,language);
  const themes={light:Blockly.Themes.Classic,dark:Blockly.Themes.Dark};
  themes.kimbie=Blockly.Theme.defineTheme('liems_kimbie',{base:Blockly.Themes.Dark,componentStyles:{workspaceBackgroundColour:'#221a0f',toolboxBackgroundColour:'#302417',flyoutBackgroundColour:'#302417',toolboxForegroundColour:'#e7d7c0',scrollbarColour:'#795b36'}});
  themes.monokai=Blockly.Theme.defineTheme('liems_monokai',{base:Blockly.Themes.Dark,componentStyles:{workspaceBackgroundColour:'#272822',toolboxBackgroundColour:'#2d2e28',flyoutBackgroundColour:'#2d2e28',toolboxForegroundColour:'#f8f8f2',scrollbarColour:'#75715e'}});
  document.body.dataset.theme=theme;

  function localizedToolbox() {
    const toolbox=$('toolbox').cloneNode(true);
    toolbox.querySelectorAll('[data-category-key]').forEach(category=>category.setAttribute('name',t(category.dataset.categoryKey)));
    toolbox.querySelectorAll('[data-label-key]').forEach(label=>label.setAttribute('text',t(label.dataset.labelKey)));
    return toolbox;
  }
  window.LiemsStudioAudio.install(Blockly);
  const workspace=Blockly.inject('blocklyDiv',{
    toolbox:localizedToolbox(),media:'media/',sounds:true,trashcan:false,renderer:'liems_lab',
    theme:themes[theme],
    grid:{spacing:28,length:0,colour:'#dce3ef',snap:true},
    zoom:{controls:false,wheel:true,startScale:1.08,maxScale:2,minScale:.5,scaleSpeed:1.15},
    move:{scrollbars:true,drag:true,wheel:true}
  });
  const audioManager=workspace.getAudioManager(),playAudio=audioManager.play;
  audioManager.play=function(){if(soundEnabled)return playAudio.apply(this,arguments);};
  $('soundToggle').checked=soundEnabled;
  $('soundToggle').addEventListener('change',()=>{soundEnabled=$('soundToggle').checked;saveSettings();});
  const categories=[
    ['categoryStart','i-play','start'],['categoryMotion','i-motion','motion'],
    ['categoryControl','i-loop','control'],['categoryGripper','i-gripper','gripper'],
    ['categorySensors','i-sensor','sensor'],['categoryMath','i-math','math'],
    ['categoryText','i-text','text'],['categoryAdvanced','i-advanced','advanced'],
    ['categoryVariables','i-code','variables'],['categoryFunctions','i-code','functions'],['categoryLists','i-blocks','lists']
  ];
  function toolboxItems() {
    const list=[];
    function walk(items){items.forEach(item=>{list.push(item);if(item.getChildToolboxItems)walk(item.getChildToolboxItems());});}
    walk(workspace.getToolbox().getToolboxItems()); return list;
  }
  function decorateToolbox() {
    toolboxItems().forEach(item=>{
      const spec=categories.find(category=>item.getName&&item.getName()===t(category[0]));
      if(!spec||!item.getDiv) return;
      const div=item.getDiv(), row=div.matches('.blocklyTreeRow')?div:div.querySelector('.blocklyTreeRow');
      if(!row)return;
      row.style.setProperty('--category-colour','var(--block-'+spec[2]+')');
      const icon=row.querySelector('.blocklyTreeIcon');
      if(icon){icon.innerHTML='<svg aria-hidden="true"><use href="#'+spec[1]+'"/></svg>';icon.style.backgroundImage='none';}
      let meta=row.querySelector('.category-meta');
      if(!meta){meta=document.createElement('span');meta.className='category-meta';row.appendChild(meta);}
      const definition=$('toolbox').querySelector('[data-category-key="'+spec[0]+'"]');
      const children=Array.from(definition.children);
      const groups=children.filter(child=>child.tagName.toLowerCase()==='category');
      const blocks=children.filter(child=>child.tagName.toLowerCase()==='block');
      const locked=blocks.filter(block=>block.getAttribute('disabled')==='true').length;
      meta.textContent=definition.hasAttribute('custom')?t('categoryDynamic'):
        groups.length?t('groupsCount',{count:groups.length}):
        locked?t('availableLocked',{available:blocks.length-locked,locked}):t('blocksCount',{count:blocks.length});
    });
    Blockly.svgResize(workspace);
  }
  function setLanguage(nextLanguage) {
    if(nextLanguage===language)return;
    const selected=workspace.getToolbox().getSelectedItem();
    const selectedKey=selected&&categories.find(category=>selected.getName()===t(category[0]));
    presentationChanging=true;
    Blockly.Events.disable();
    try {
      language=nextLanguage;window.LiemsStudioCompat.setLanguage(language); locale.relabelWorkspace(workspace,language);window.LiemsStudioCompat.relabelWorkspace(workspace,language);
      workspace.updateToolbox(localizedToolbox());
      if(selectedKey){const item=toolboxItems().find(candidate=>candidate.getName()===t(selectedKey[0]));if(item)workspace.getToolbox().setSelectedItem(item);}
      if(projectIsPreset&&!Object.prototype.hasOwnProperty.call(window.LiemsStudioSamples,$('projectName').value)){const oldName=$('projectName').value;$('projectName').value=t(currentExample==='square'?'loopProject':'firstProject');if(cleanName===oldName)cleanName=$('projectName').value;}
      applyPageText(); decorateToolbox(); window.LiemsPreviewBlocks.decorateWorkspace(workspace,language); updateCode();
    } finally { Blockly.Events.enable();presentationChanging=false; }
    saveSettings();
  }
  function setTheme(nextTheme) {
    const selected=workspace.getToolbox().getSelectedItem();
    const selectedKey=selected&&categories.find(category=>selected.getName()===t(category[0]));
    presentationChanging=true;Blockly.Events.disable();
    try {
      theme=nextTheme;document.body.dataset.theme=theme;
      workspace.setTheme(themes[theme]);
      if(selectedKey){const item=toolboxItems().find(candidate=>candidate.getName()===t(selectedKey[0]));if(item)workspace.getToolbox().setSelectedItem(item);}
      applyPageText();decorateToolbox();window.LiemsPreviewBlocks.decorateWorkspace(workspace,language);
    } finally { Blockly.Events.enable();presentationChanging=false; }
    saveSettings();
  }
  function serialize() { return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)); }
  function markClean(label) { cleanXml=serialize();cleanName=$('projectName').value;cleanLabel=label;updateDirtyState(); }
  function updateProjectTitle() {
    const name=$('projectName').value.trim()||t('firstProject');
    document.title=name+' · NEXT GEN ROBOTICS';
    $('projectName').title=name;
    if(cabiSnapshot)$('cabiContext').textContent=cabiStale?t('cabiUpdated'):t('cabiContext',{name,count:cabiSnapshot.blocks.filter(block=>!block.shadow).length});
  }
  function updateDirtyState() {
    updateProjectTitle();
    if(!cleanXml){$('saveState').textContent=t('example');return;}
    $('saveState').textContent=t(serialize()===cleanXml&&$('projectName').value===cleanName?cleanLabel:'unsaved');
  }
  function updateCode() {
    workspaceXml=serialize();
    $('blockCount').textContent=t('blocksCount',{count:workspace.getAllBlocks(false).filter(block=>!block.isShadow()).length});
    try {
      const code=Blockly.Python.workspaceToCode(workspace);
      window.currentGeneratedCode=code;
      window.currentDisplayCode=code;
      $('codeOutput').textContent=code||'# NEXT GEN ROBOTICS';
      $('lineCount').textContent=t('lines',{count:code.trimEnd()?code.trimEnd().split('\n').length:0});
    }
    catch(error){window.currentGeneratedCode='';window.currentDisplayCode='';$('codeOutput').textContent=t('codeError',{message:error.message});}
    estimate=estimateDuration();renderResult();
  }
  const number=(name,value)=>'<value name="'+name+'"><shadow type="math_number"><field name="NUM">'+value+'</field></shadow></value>';
  function exampleXml(name) {
    const move='<block type="motors_go_forward">'+number('speed',50)+'<next><block type="time_delay">'+number('ms',1)+'<next><block type="motors_turn_right">'+number('speed',50)+'<next><block type="time_delay">'+number('ms',.5)+'<next><block type="preview_stop"/></next></block></next></block></next></block></next></block>';
    const body=name==='square'?'<block type="controls_repeat_ext">'+number('TIMES',4)+'<statement name="DO">'+move+'</statement></block>':move;
    return '<xml xmlns="https://developers.google.com/blockly/xml"><block type="other_start" x="'+(window.innerWidth<980?50:280)+'" y="85"><next>'+body+'</next></block></xml>';
  }
  function stopWalkthrough(key,args) {
    clearTimeout(runTimer);isRunning=false;workspace.highlightBlock(null);
    $('runProgram').disabled=false;$('stopProgram').disabled=true;resultBadge='ready';
    if(key)state(key,args);else renderResult();updatePlayButton();
  }
  function loadExample(name) {
    if(!mayReplace(()=>loadExample(name)))return;
    stopWalkthrough();currentExample=name;projectIsPreset=true;templateEditing=true;
    Blockly.Events.setGroup(true);
    try{workspace.clear();Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(exampleXml(name)),workspace);}
    finally{Blockly.Events.setGroup(false);templateEditing=false;}
    setLesson(name==='square'?'loop':'first','template');
    $('projectName').value=t(name==='square'?'loopProject':'firstProject');markClean('example');
    runIndex=0;state(connected?'backendState':'runIdle',{state:simulationState||'IDLE'});updateCode();saveDraft();if($('projectsDialog').open)$('projectsDialog').close();
  }
  function numericValue(block,input) {
    const value=block.getInputTargetBlock(input);
    if(!value||value.type!=='math_number')throw new Error('walkErrorNumber');
    const result=Number(value.getFieldValue('NUM'));if(!Number.isFinite(result))throw new Error('walkErrorNumber');return result;
  }
  const actionKeys={motors_go_forward:'moveForward',motors_go_backward:'moveBackward',motors_turn_left:'turnLeft',motors_turn_right:'turnRight',preview_stop:'stopMoving'};
  function buildSteps() {
    const steps=[];let total=0;
    function add(block,key,args,wait=700){if(++total>200)throw new Error('walkErrorSteps');steps.push({id:block.id,key,args:args||{},wait});}
    function walk(block,depth=0){
      if(depth>8)throw new Error('walkErrorDepth');
      while(block){
        if(!block.isEnabled()){block=block.getNextBlock();continue;}
        if(block.type==='other_start')add(block,'startStep');
        else if(actionKeys[block.type]){
          const speed=block.type==='preview_stop'?null:numericValue(block,'speed');
          if(speed!==null&&(speed<0||speed>100))throw new Error('walkErrorSpeed');
          add(block,actionKeys[block.type],{speed});
        }
        else if(block.type==='time_delay'){const seconds=numericValue(block,'ms');if(seconds<0||seconds>10)throw new Error('walkErrorWait');add(block,'waitStep',{seconds},Math.max(350,seconds*1000));}
        else if(block.type==='arm_up'||block.type==='arm_down'){const height=numericValue(block,'height');if(height<0)throw new Error('walkErrorHeight');add(block,block.type==='arm_up'?'raiseArm':'lowerArm',{height});}
        else if(block.type==='controls_repeat_ext'){const count=numericValue(block,'TIMES');if(!Number.isInteger(count)||count<0||count>20)throw new Error('walkErrorRepeat');for(let i=0;i<count;i++){add(block,'repeatStep',{current:i+1,total:count},450);walk(block.getInputTargetBlock('DO'),depth+1);}}
        else throw new Error('walkErrorUnsupported');
        block=block.getNextBlock();
      }
    }
    const stacks=workspace.getTopBlocks(true).filter(block=>!block.isShadow());
    if(stacks.length!==1||stacks[0].type!=='other_start')throw new Error('walkErrorStart');
    walk(stacks[0]);return steps;
  }
  // A duration estimate uses only explicit wait blocks, never the UI animation clock.
  function estimateDuration() {
    return window.LiemsStudioCompat.estimateDuration(workspace).seconds;
  }
  function runWalkthrough() {
    try{runSteps=buildSteps();}catch(error){toast(error.message);return;}
    runIndex=0;isRunning=true;resultBadge='running';$('runProgram').disabled=true;$('stopProgram').disabled=false;
    function next(){
      if(!isRunning)return;
      if(runIndex===runSteps.length){stopWalkthrough('walkthroughDone',{count:runSteps.length});return;}
      const step=runSteps[runIndex++];workspace.highlightBlock(step.id);
      state(step.key,step.args);runTimer=setTimeout(next,step.wait);
    }
    next();toast('walkthroughNote');
  }
  function sendToRobot(message) {
    if(!connected||!robotWindow){toast('notConnected');return false;}
    try{robotWindow.send(message);return true;}catch(error){toast('notConnected');return false;}
  }
  function traceDescriptors(){
    function literal(block,input,fallback){const value=block.getInputTargetBlock(input);return !value?fallback:value.type==='math_number'?Number(value.getFieldValue('NUM')):'…';}
    return workspace.getAllBlocks(false).filter(block=>!block.isShadow()&&block.isEnabled()).map(block=>{
      let key='genericLiveBlock',args={};
      if(actionKeys[block.type]){key=actionKeys[block.type];args={speed:literal(block,'speed',50)};}
      else if(block.type==='other_start')key='startStep';
      else if(block.type==='other_end')key='endLive';
      else if(block.type==='time_delay'){key='waitStep';args={seconds:literal(block,'ms',1)};}
      else if(block.type==='arm_up'||block.type==='arm_down'){key=block.type==='arm_up'?'raiseArm':'lowerArm';args={height:literal(block,'height',block.type==='arm_up'?250:50)};}
      else if(block.type==='controls_repeat_ext'||block.type==='controls_repeat')key='loopLive';
      else if(block.type==='controls_if')key='ifLive';
      else if(['control_while','controls_whileUntil','controls_for','controls_forEach'].includes(block.type))key='whileLive';
      else if(block.type==='control_stop_all')key='stopRobotLive';
      else if(block.type.startsWith('procedures_call')){key='functionLive';args={name:block.getFieldValue('NAME')||''};}
      return {id:block.id,type:block.type,key,args};
    });
  }
  function clearExecution(){tracePresentation.clear();execution.clear();workspace.highlightBlock(null);}
  function receiveTrace(message){
    if(!execution.consume(message))return;
    const live=execution.get();
    tracePresentation.pause(paused);
    tracePresentation.push(live);
    resultBadge=['end','error','interrupted'].includes(message.phase)?'ready':paused?'paused':'running';
    renderResult();
  }
  function updatePlayButton(){
    $('playPauseLabel').textContent=t(previewMode&&!connected?'stop':paused?'resume':'pause');
    $('playPauseIcon').setAttribute('href',paused?'#i-play':'#i-pause');
    $('stopProgram').disabled=resetPending||worldResetPending||(!connected&&!isRunning);
    $('runProgram').disabled=isRunning||resetPending||worldResetPending||(!connected&&!previewMode);
    $('resetProgram').disabled=worldResetPending||resetPending;
    $('resetWorld').disabled=resetPending||worldResetPending||!connected||!capabilities.worldReset;
    $('resetWorld').title=t(connected&&capabilities.worldReset?'worldResetTooltip':'worldResetUnavailable');
  }
  function receiveWebotsMessage(raw) {
    const message=protocol.parseMessage(raw);if(!message)return;
    connected=true;connecting=false;
    if(message.kind==='trace'){receiveTrace(message);renderConnection();return;}
    if(message.kind==='time'||message.kind==='status'){
      if(message.time!==undefined)$('timerDisplay').textContent=protocol.formatTime(message.time);
      if(message.capabilities)capabilities=Object.assign(capabilities,message.capabilities);
      if(message.playing!==undefined){worldPlaying=message.playing;paused=!message.playing;tracePresentation.pause(paused);}
      if(message.state!==undefined){simulationState=message.state;if(!resetPending&&!worldResetPending&&!execution.get()&&!['worldResetDoneRunning','worldResetDonePaused','unloadedProgram','worldResetUnconfirmed','backendError'].includes(resultState.key)){resultBadge=message.state==='RUNNING'&&!paused?'running':'ready';state(paused?'pausedProgram':'backendState',{state:message.state});}}
    }
    if(message.kind==='ready'){simulationState='IDLE';if(!execution.get())state('connectedReady');}
    if(message.kind==='error'){clearExecution();resultBadge='ready';state('backendError',{message:message.message});}
    if(message.kind==='ack'){
      if(message.playing!==undefined){worldPlaying=message.playing;paused=!message.playing;tracePresentation.pause(paused);}
      if(message.command==='WORLD_RESET'&&worldResetPending){
        clearTimeout(worldResetTimer);worldResetPending=false;clearExecution();
        if(message.phase==='done'){$('timerDisplay').textContent=protocol.formatTime(message.time);programState='noCode';lastCode='';resultBadge='ready';state(message.playing?'worldResetDoneRunning':'worldResetDonePaused');}
        else state('backendError',{message:message.message||t('worldResetUnconfirmed')});
      }
      if(message.command==='RESET'&&resetPending&&message.phase==='done'){
        clearTimeout(resetTimer);resetPending=false;clearExecution();programState='noCode';lastCode='';resultBadge='ready';state('unloadedProgram');
      }
    }
    if(resetPending&&!capabilities.worldReset&&message.kind==='status'&&message.state==='IDLE'){
      clearTimeout(resetTimer);resetPending=false;clearExecution();programState='noCode';lastCode='';resultBadge='ready';state('unloadedProgram');
    }
    renderConnection();renderResult();updatePlayButton();
  }
  async function initializeWebots() {
    if(previewMode)return;
    connecting=true;renderConnection();updatePlayButton();
    try{
      const module=await import('./RobotWindow.js?v=home0');
      robotWindow=new module.default();robotWindow.receive=receiveWebotsMessage;
      window.robotWindowObj=robotWindow;
      function disconnected(){connected=false;connecting=false;worldPlaying=null;capabilities={trace:false,worldReset:false};clearExecution();clearTimeout(resetTimer);clearTimeout(worldResetTimer);resetPending=worldResetPending=false;renderConnection();updatePlayButton();state('notConnected');}
      robotWindow.socket.addEventListener('close',disconnected);
      robotWindow.socket.addEventListener('error',disconnected);
      // Opening or restoring a project never sends CODE or reset commands.
    }catch(error){connecting=false;renderConnection();state('notConnected');}
  }
  function uploadProgram(){
    if(!connected){if(previewMode)runWalkthrough();else toast('notConnected');return;}
    let code;const runId=Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,12);
    try{code=window.LiemsStudioCompat.generateTraceCode(workspace,runId);}catch(error){toast('codeError',{message:error.message});return;}
    if(!workspace.getAllBlocks(false).some(block=>!block.isShadow()&&block.isEnabled())){toast('noCode');return;}
    // A paused program may consume CODE inside check_interrupt. Resume first.
    clearExecution();execution.begin(runId,traceDescriptors(),Object.assign(window.LiemsStudioCompat.estimateDuration(workspace),{xml:workspaceXml,name:$('projectName').value}));
    if(!sendToRobot('CMD:PLAY')){clearExecution();return;}
    if(!sendToRobot('RUN:'+JSON.stringify({runId}))){clearExecution();return;}
    if(sendToRobot('CODE:'+code)){paused=false;lastCode=code;programState='loadedProgram';resultBadge='running';state('traceWaiting');updatePlayButton();}
    else clearExecution();
  }
  function toggleSimulation(){
    if(isRunning){stopWalkthrough('walkthroughStopped');return;}
    if(!connected){toast('notConnected');return;}
    if(sendToRobot(paused?'CMD:PLAY':'CMD:PAUSE')){paused=!paused;state(paused?'pausePending':'resumePending');updatePlayButton();}
  }
  function resetSimulation(){
    stopWalkthrough();clearExecution();runIndex=0;
    if(!connected){if(previewMode){programState='noCode';state('previewResetDone');toast('resetOffline');}else toast('notConnected');return;}
    if(sendToRobot('CMD:RESET')){
      clearTimeout(resetTimer);resetPending=true;resultBadge='waitingReset';state('resetPending');updatePlayButton();
      resetTimer=setTimeout(()=>{if(!resetPending)return;resetPending=false;resultBadge='ready';state('resetUnconfirmed');updatePlayButton();},5000);
    }
  }
  function resetWorld(){
    if(!connected||!capabilities.worldReset){toast('worldResetUnavailable');return;}
    if(sendToRobot('CMD:WORLD_RESET')){
      stopWalkthrough();clearExecution();worldResetPending=true;resultBadge='waitingReset';state('worldResetPending');updatePlayButton();
      clearTimeout(worldResetTimer);worldResetTimer=setTimeout(()=>{if(!worldResetPending)return;worldResetPending=false;resultBadge='ready';state('worldResetUnconfirmed');updatePlayButton();},5000);
    }
  }
  $('runProgram').addEventListener('click',uploadProgram);
  $('stopProgram').addEventListener('click',toggleSimulation);
  $('resetProgram').addEventListener('click',resetSimulation);
  $('resetWorld').addEventListener('click',resetWorld);
  $('languageToggle').addEventListener('click',()=>setLanguage(language==='vi'?'en':'vi'));
  $('themeToggle').addEventListener('click',()=>setTheme(theme==='light'?'dark':'light'));
  $('themeSelect').addEventListener('change',()=>setTheme($('themeSelect').value));
  function setLesson(id,origin){
    currentLesson=lessons.templateIds.includes(id)?id:null;lessonOrigin=origin==='template'?'template':'manual';
    resetCabi();renderLesson();
  }
  function lessonId(){return currentLesson||(!workspace.getAllBlocks(false).some(block=>!block.isShadow())&&lessonOrigin==='manual'?'empty':'manual');}
  function renderLesson(){
    const id=lessonId(),guide=lessons.getGuide(id,language);
    $('guidePanel').dataset.lesson=id;
    $('lessonKicker').textContent=guide.kicker;$('lessonTitle').textContent=guide.title;$('lessonDescription').textContent=guide.description;$('lessonNote').textContent=guide.note;
    const list=$('lessonSteps');list.replaceChildren();
    guide.steps.forEach((step,index)=>{const li=document.createElement('li'),number=document.createElement('span'),body=document.createElement('div'),title=document.createElement('strong'),hint=document.createElement('small');number.className='step-number';number.textContent=String(index+1).padStart(2,'0');title.textContent=step.title;hint.textContent=step.hint;body.append(title,hint);li.append(number,body);list.appendChild(li);});
    const suggestions=$('cabiSuggestions');suggestions.replaceChildren();
    lessons.getQuestions(id,language).forEach(question=>{const button=document.createElement('button');button.className='suggestion';button.textContent=question;button.addEventListener('click',()=>requestCabiAdvice(question));suggestions.appendChild(button);});
  }
  function resetCabi(){
    cabiSnapshot=null;cabiQuestion='';cabiStale=false;$('cabiDraft').value='';$('cabiResponse').hidden=true;$('cabiPanel').classList.remove('has-response');$('cabiBody').scrollTop=0;
  }
  $('cabiReset').addEventListener('click',resetCabi);
  function setAssistantTab(name){
    const cabi=name==='cabi';$('cabiPanel').hidden=!cabi;$('guidePanel').hidden=cabi;
    $('cabiTab').classList.toggle('active',cabi);$('guideTab').classList.toggle('active',!cabi);
    $('cabiTab').setAttribute('aria-selected',String(cabi));$('guideTab').setAttribute('aria-selected',String(!cabi));
  }
  $('cabiTab').addEventListener('click',()=>setAssistantTab('cabi'));$('guideTab').addEventListener('click',()=>setAssistantTab('guide'));
  [$('guideTab'),$('cabiTab')].forEach(tab=>tab.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();const cabi=tab.id==='guideTab';setAssistantTab(cabi?'cabi':'guide');$(cabi?'cabiTab':'guideTab').focus();}}));
  function renderCabiAdvice(){
    if(!cabiSnapshot)return;
    const reply=window.LiemsCabiBot.advise(cabiSnapshot,cabiQuestion,language);
    $('cabiResponse').hidden=false;$('cabiPanel').classList.add('has-response');
    $('cabiContext').textContent=cabiStale?t('cabiUpdated'):t('cabiContext',{name:$('projectName').value||t('firstProject'),count:cabiSnapshot.blocks.filter(block=>!block.shadow).length});
    $('cabiAnswerTitle').textContent=reply.title;
    $('cabiAnswerBody').textContent=reply.body;
    $('cabiEvidence').textContent=Array.isArray(reply.evidence)?reply.evidence.join(' · '):reply.evidence;
    $('cabiAction').textContent=reply.action;
    $('cabiQuestion').textContent=reply.question;
  }
  function requestCabiAdvice(question){
    cabiSnapshot=window.LiemsCabiBot.snapshot(Blockly,workspace);cabiQuestion=question||'';cabiStale=false;
    renderCabiAdvice();
    $('cabiDraft').value='';$('cabiBody').scrollTop=$('cabiResponse').offsetTop-$('cabiBody').offsetTop;
  }
  $('cabiReview').addEventListener('click',()=>requestCabiAdvice(''));
  $('cabiSend').addEventListener('click',()=>requestCabiAdvice($('cabiDraft').value.trim()));
  $('cabiDraft').addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();requestCabiAdvice($('cabiDraft').value.trim());}});
  function setPython(open){
    document.body.classList.toggle('code-open',open);$('pythonTab').classList.toggle('active',open);$('blocksTab').classList.toggle('active',!open);
    $('pythonTab').setAttribute('aria-pressed',String(open));$('blocksTab').setAttribute('aria-pressed',String(!open));try{localStorage.setItem('python_panel_hidden',open?'0':'1');}catch(error){}
    requestAnimationFrame(()=>Blockly.svgResize(workspace));
  }
  $('blocksTab').addEventListener('click',()=>setPython(false));$('pythonTab').addEventListener('click',()=>setPython(!document.body.classList.contains('code-open')));
  $('zoomIn').addEventListener('click',()=>workspace.zoomCenter(1));$('zoomOut').addEventListener('click',()=>workspace.zoomCenter(-1));
  $('centerBlocks').addEventListener('click',()=>{workspace.getToolbox().clearSelection();workspace.scrollCenter();});
  $('projectName').addEventListener('input',()=>{projectIsPreset=false;updateDirtyState();saveDraft();});
  let replacementGranted=false;
  const reservedNames=['TEST','SENSOR_ADV'];
  function isDirty(){return Boolean(cleanXml)&&(serialize()!==cleanXml||$('projectName').value!==cleanName);}
  function confirmAction(title,text,action){
    confirmCallback=action;$('confirmTitle').textContent=title;$('confirmText').textContent=text;
    $('confirmDialog').showModal();
  }
  function mayReplace(action){
    if(!isDirty()||replacementGranted){replacementGranted=false;return true;}
    confirmAction(t('replaceTitle'),t('replaceHint'),()=>{replacementGranted=true;action();});return false;
  }
  $('cancelAction').addEventListener('click',()=>{$('confirmDialog').close();confirmCallback=null;});
  $('confirmAction').addEventListener('click',()=>{const action=confirmCallback;confirmCallback=null;$('confirmDialog').close();if(action)action();});
  $('confirmDialog').addEventListener('cancel',()=>{confirmCallback=null;});
  function saveDraft(){
    try{localStorage.setItem(DRAFT_KEY,JSON.stringify({name:$('projectName').value,xml:serialize(),cleanName,cleanXml,cleanLabel,currentExample,projectIsPreset,currentLesson,lessonOrigin}));}catch(error){/* File actions report storage failures when explicitly used. */}
  }
  function lessonRecord(name){const records=readStorage(LESSON_KEY);return Array.isArray(records)?records.find(record=>record&&record.name===name):null;}
  function saveLessonRecord(name){const records=readStorage(LESSON_KEY);const list=Array.isArray(records)?records.filter(record=>record&&record.name!==name):[];list.push({name,templateId:currentLesson,origin:lessonOrigin});localStorage.setItem(LESSON_KEY,JSON.stringify(list));}
  function validateXml(text){
    if(typeof text!=='string'||text.length>2000000)throw Error('xmlLimit');
    const parsed=new DOMParser().parseFromString(text,'text/xml');
    if(parsed.querySelector('parsererror')||parsed.documentElement.tagName.toLowerCase()!=='xml')throw Error('loadFailure');
    parsed.querySelectorAll('block,shadow').forEach(node=>{if(!Blockly.Blocks[node.getAttribute('type')])throw Error('unknownBlock');});
    // Earlier preview files could put another block after stop moving. Preserve
    // that tail as a separate stack instead of discarding it with the new cap.
    let detached=false;
    parsed.querySelectorAll('block[type="preview_stop"]').forEach(node=>{
      const next=Array.from(node.children).find(child=>child.tagName.toLowerCase()==='next');
      if(!next)return;
      const tail=Array.from(next.children).find(child=>child.tagName.toLowerCase()==='block');
      if(tail){tail.setAttribute('x','70');tail.setAttribute('y','340');parsed.documentElement.appendChild(tail);detached=true;}
      next.remove();
    });
    const xml=Blockly.Xml.textToDom(new XMLSerializer().serializeToString(parsed.documentElement));
    const trial=new Blockly.Workspace();
    try{Blockly.Xml.domToWorkspace(xml.cloneNode(true),trial);Blockly.Python.workspaceToCode(trial);}finally{trial.dispose();}
    return {xml,detached};
  }
  function loadXml(text,name,label='saved',record=null){
    const {xml,detached}=validateXml(text);
    const backup=serialize(),oldName=$('projectName').value;
    stopWalkthrough();Blockly.Events.setGroup(true);
    try{
      workspace.clear();Blockly.Xml.domToWorkspace(xml,workspace);$('projectName').value=name;
      projectIsPreset=false;setLesson(record&&record.templateId,record&&record.origin);window.LiemsStudioCompat.relabelWorkspace(workspace,language);
      markClean(label);updateCode();workspace.scrollCenter();saveDraft();
      state(connected?'backendState':'runIdle',{state:simulationState||'IDLE'});
      if(detached)toast('detachedTail');return detached;
    }catch(error){workspace.clear();Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(backup),workspace);$('projectName').value=oldName;throw error;}
    finally{Blockly.Events.setGroup(false);}
  }
  function restoreDraft(){
    const draft=readStorage(DRAFT_KEY);
    if(draft&&typeof draft.name==='string'&&typeof draft.xml==='string'){
      try{
        loadXml(draft.xml,draft.name,'saved',{templateId:draft.currentLesson||(draft.projectIsPreset?(draft.name==='TEST'||draft.name==='SENSOR_ADV'?draft.name:draft.currentExample==='square'?'loop':'first'):null),origin:draft.lessonOrigin||(draft.projectIsPreset?'template':'manual')});
        cleanName=typeof draft.cleanName==='string'?draft.cleanName:draft.name;
        cleanXml=typeof draft.cleanXml==='string'?draft.cleanXml:serialize();
        cleanLabel=draft.cleanLabel==='example'?'example':'saved';
        currentExample=draft.currentExample==='square'?'square':'first';
        projectIsPreset=Boolean(draft.projectIsPreset);updateDirtyState();return;
      }catch(error){toast('draftFailure');}
    }
    const old=localStorage.getItem(STORAGE_PREFIX+'MyProject');
    if(old){try{loadXml(old,'MyProject');return;}catch(error){/* Keep the original saved entry intact. */}}
    $('projectName').value='Code_'+robotName;
    markClean('saved');updateCode();saveDraft();
  }
  function showSaveAs(){
    $('saveName').value=($('projectName').value.trim()||'Code_'+robotName)+(projectIsPreset||reservedNames.includes($('projectName').value.trim())?'_copy':'');
    $('saveDialog').showModal();$('saveName').focus();$('saveName').select();
  }
  function writeProject(name){
    try{
      localStorage.setItem(STORAGE_PREFIX+name,serialize());saveLessonRecord(name);$('projectName').value=name;projectIsPreset=false;
      markClean('saved');saveDraft();toast('saveSuccess');renderFiles();
    }catch(error){toast('saveFailure');}
  }
  function saveProject(name){
    if(typeof name!=='string')name=$('projectName').value.trim();
    if(!name||name.length>60||reservedNames.includes(name)||projectIsPreset){showSaveAs();return;}
    if(localStorage.getItem(STORAGE_PREFIX+name)!==null&&(name!==cleanName||cleanLabel!=='saved')){
      confirmAction(t('overwriteTitle'),t('overwriteHint',{name}),()=>writeProject(name));return;
    }
    writeProject(name);
  }
  $('saveProject').addEventListener('click',()=>saveProject());
  $('confirmSave').addEventListener('click',()=>{
    const name=$('saveName').value.trim();
    if(!name||reservedNames.includes(name)){toast('chooseFileName');return;}
    $('saveDialog').close();projectIsPreset=false;saveProject(name);
  });
  $('saveName').addEventListener('keydown',event=>{if(event.key==='Enter'){$('confirmSave').click();event.preventDefault();}});
  function getStars(){const stars=readStorage(STAR_KEY);return Array.isArray(stars)?stars.filter(value=>typeof value==='string'):[];}
  function toggleStar(name){
    try{const stars=getStars();const at=stars.indexOf(name);if(at<0)stars.push(name);else stars.splice(at,1);localStorage.setItem(STAR_KEY,JSON.stringify(stars));renderFiles();}catch(error){toast('saveFailure');}
  }
  function deleteProject(name){
    if(reservedNames.includes(name))return;
    confirmAction(t('deleteTitle'),t('deleteHint',{name}),()=>{
      try{localStorage.removeItem(STORAGE_PREFIX+name);localStorage.setItem(STAR_KEY,JSON.stringify(getStars().filter(item=>item!==name)));const records=readStorage(LESSON_KEY);if(Array.isArray(records))localStorage.setItem(LESSON_KEY,JSON.stringify(records.filter(record=>record&&record.name!==name)));renderFiles();toast('deleteSuccess');}catch(error){toast('saveFailure');}
    });
  }
  function renderFiles(){
    const container=$('projectFiles');container.replaceChildren();const files=[],stars=getStars();
    try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key.startsWith(STORAGE_PREFIX))files.push(key.slice(STORAGE_PREFIX.length));}}catch(error){toast('saveFailure');}
    files.sort((a,b)=>Number(stars.includes(b))-Number(stars.includes(a))||a.localeCompare(b,language));
    for(const name of files){
      const row=document.createElement('div');row.className='file-row';
      const star=document.createElement('button');star.className='btn file-star';star.textContent=stars.includes(name)?'★':'☆';star.setAttribute('aria-label',t(stars.includes(name)?'unpin':'pin',{name}));star.setAttribute('aria-pressed',String(stars.includes(name)));star.addEventListener('click',()=>toggleStar(name));
      const open=document.createElement('button');open.className='file-open';open.textContent=name;open.title=name;open.addEventListener('click',()=>loadProject(name));
      const remove=document.createElement('button');remove.className='btn ghost';remove.textContent='×';remove.setAttribute('aria-label',t('deleteFile',{name}));remove.addEventListener('click',()=>deleteProject(name));
      row.append(star,open,remove);container.appendChild(row);
    }
    if(!files.length){const empty=document.createElement('p');empty.className='description';empty.textContent=t('noSavedProject');container.appendChild(empty);}
    const preview=readStorage(PROJECT_KEY);
    if(preview&&typeof preview.name==='string'&&typeof preview.xml==='string'){
      const button=document.createElement('button');button.className='example';button.textContent=t('importPreview',{name:preview.name});
      button.addEventListener('click',()=>{if(!mayReplace(()=>button.click()))return;try{loadXml(preview.xml,preview.name,'example');$('projectsDialog').close();toast('loadSuccess');}catch(error){toast(error.message in locale.page[language]?error.message:'loadFailure');}});container.appendChild(button);
    }
  }
  function openProjects(){renderFiles();$('projectsDialog').showModal();}
  function loadProject(name){
    if(!mayReplace(()=>loadProject(name)))return;
    const preset=Object.prototype.hasOwnProperty.call(window.LiemsStudioSamples,name)?window.LiemsStudioSamples[name]:null,text=preset||localStorage.getItem(STORAGE_PREFIX+name);
    if(!text){toast('loadFailure');return;}
    try{const detached=loadXml(text,name,preset?'example':'saved',preset?{templateId:name,origin:'template'}:lessonRecord(name));projectIsPreset=Boolean(preset);saveDraft();$('projectsDialog').close();toast(detached?'detachedTail':'loadSuccess');}
    catch(error){toast(error.message in locale.page[language]?error.message:'loadFailure');}
  }
  $('openProjects').addEventListener('click',openProjects);$('moreExamples').addEventListener('click',openProjects);
  $('openHelp').addEventListener('click',()=>$('helpDialog').showModal());
  $('openSettings').addEventListener('click',()=>$('settingsDialog').showModal());
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  document.querySelectorAll('[data-example]').forEach(button=>button.addEventListener('click',()=>{loadExample(button.dataset.example);if(!isDirty())$('projectsDialog').close();}));
  document.querySelectorAll('[data-original-example]').forEach(button=>button.addEventListener('click',()=>loadProject(button.dataset.originalExample)));
  function newProject(){
    if(!mayReplace(newProject))return;
    stopWalkthrough();Blockly.Events.setGroup(true);try{workspace.clear();}finally{Blockly.Events.setGroup(false);}
    $('projectName').value='Code_'+robotName;projectIsPreset=false;setLesson(null,'manual');markClean('saved');updateCode();saveDraft();$('projectsDialog').close();
  }
  $('newProject').addEventListener('click',newProject);
  $('undoBlocks').addEventListener('click',()=>workspace.undo(false));$('redoBlocks').addEventListener('click',()=>workspace.undo(true));
  $('clearBlocks').addEventListener('click',()=>confirmAction(t('clearWorkspace'),t('clearHint'),()=>{Blockly.Events.setGroup(true);try{workspace.clear();}finally{Blockly.Events.setGroup(false);}$('settingsDialog').close();}));
  function showXmlDialog(mode){
    const exporting=mode==='export';$('xmlTitle').textContent=t(exporting?'exportXml':'importXml');$('xmlHint').textContent=t(exporting?'xmlExportHint':'xmlImportHint');
    $('xmlText').value=exporting?serialize():'';$('xmlText').readOnly=exporting;
    $('xmlCopy').hidden=!exporting;$('xmlDownload').hidden=!exporting;$('xmlApply').hidden=exporting;$('xmlPick').hidden=exporting;
    $('xmlDialog').showModal();$('xmlText').focus();if(exporting)$('xmlText').select();
  }
  $('exportXml').addEventListener('click',()=>showXmlDialog('export'));
  $('importXml').addEventListener('click',()=>showXmlDialog('import'));
  $('xmlCopy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('xmlText').value);toast('xmlCopySuccess');}catch(error){$('xmlText').focus();$('xmlText').select();toast('xmlCopyFallback');}});
  $('xmlDownload').addEventListener('click',()=>{
    const xml=$('xmlText').value,name=($('projectName').value.trim()||'Code').replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_');
    const url=URL.createObjectURL(new Blob([xml],{type:'text/xml;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download=name+'.xml';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('exportSuccess');
  });
  function importText(text,name){
    validateXml(text);
    const load=()=>{if(!mayReplace(load))return;try{const detached=loadXml(text,name,'example');$('xmlDialog').close();$('projectsDialog').close();toast(detached?'detachedTail':'loadSuccess');}catch(error){toast('loadFailure');}};load();
  }
  $('xmlApply').addEventListener('click',()=>{try{importText($('xmlText').value,$('projectName').value.trim()||'Imported');}catch(error){toast(error.message in locale.page[language]?error.message:'loadFailure');}});
  $('xmlPick').addEventListener('click',()=>$('xmlFile').click());
  $('xmlFile').addEventListener('change',async()=>{
    const file=$('xmlFile').files[0];$('xmlFile').value='';if(!file)return;
    if(file.size>2000000){toast('xmlLimit');return;}
    try{
      const text=await file.text();importText(text,file.name.replace(/\.xml$/i,''));
    }catch(error){toast(error.message in locale.page[language]?error.message:'loadFailure');}
  });
  document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='s'){event.preventDefault();saveProject();}});
  window.addEventListener('beforeunload',()=>saveDraft());
  $('copyCode').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText($('codeOutput').textContent);toast('copySuccess');}
    catch(error){const range=document.createRange();range.selectNodeContents($('codeOutput'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('copyFallback');}
  });
  window.addEventListener('resize',()=>Blockly.svgResize(workspace));new ResizeObserver(()=>Blockly.svgResize(workspace)).observe($('blocklyDiv'));
  restoreDraft();applyPageText();updatePlayButton();
  window.workspace=workspace;
  window.userClickedImport=uploadProgram;
  window.userClickedSave=saveProject;
  window.userClickedFiles=openProjects;
  window.loadProject=loadProject;
  window.deleteProject=deleteProject;
  window.toggleStar=toggleStar;
  window.toggleLanguage=()=>setLanguage(language==='vi'?'en':'vi');
  window.applyTheme=setTheme;
  window.enableNameEdit=()=>{$('projectName').focus();$('projectName').select();};
  window.toggleCodePanel=()=>setPython(!document.body.classList.contains('code-open'));
  window.copyConsoleCode=()=>$('copyCode').click();
  window.simControl=action=>action==='WORLD_RESET'?resetWorld():action==='RESET'?resetSimulation():toggleSimulation();
  window.sendToRobot=sendToRobot;
  window.TEST_FILE_XML=window.LiemsStudioSamples.TEST;
  window.SENSOR_FILE_XML=window.LiemsStudioSamples.SENSOR_ADV;
  workspace.addChangeListener(event=>{
    if(presentationChanging||!['create','delete','change','move'].includes(event.type))return;
    if(isRunning)stopWalkthrough('walkthroughChanged');
    if(cabiSnapshot){cabiStale=true;renderCabiAdvice();}
    updateDirtyState();updateCode();renderLesson();window.LiemsStudioCompat.relabelWorkspace(workspace,language);saveDraft();
    const live=execution.get();if(live&&live.summary.xml!==workspaceXml)workspace.highlightBlock(null);
  });
  requestAnimationFrame(()=>{
    decorateToolbox();
    if(window.innerWidth>=980){const item=toolboxItems().find(category=>category.getName()===t('categoryMotion'));if(item)workspace.getToolbox().setSelectedItem(item);}
  });
  initializeWebots();
})();
