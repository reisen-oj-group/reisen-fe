# ���ò���
$REMOTE_USER = "root"                     # Զ�̷������û���
$REMOTE_HOST = "se.nanani-fan.club"       # Զ�̷�����IP/����
$REMOTE_DIR = "/var/www/reisen/frontend"  # Զ��Ŀ��Ŀ¼
$LOCAL_DIR = "dist"                       # ���� dist Ŀ¼
$ZIP_NAME = "deploy_temp.zip"             # ��ʱѹ��������

# 0. ��鱾��Ŀ¼�Ƿ����
if (-not (Test-Path $LOCAL_DIR)) {
    Write-Output "���󣺱���Ŀ¼ $LOCAL_DIR �����ڣ�"
    exit 1
}

# 1. �ڱ��ش���ѹ����
try {
    # ʹ��Compress-Archiveѹ���ļ�
    Compress-Archive -Path "$LOCAL_DIR\*" -DestinationPath $ZIP_NAME -Force
    Write-Output "�����ļ���ѹ��Ϊ $ZIP_NAME"
}
catch {
    Write-Output "ѹ���ļ�ʱ����: $_"
    exit 1
}

# 2. ���Զ��Ŀ¼��ȷ��Ŀ¼����
ssh ${REMOTE_USER}@${REMOTE_HOST} "rm -rf ${REMOTE_DIR}/* && mkdir -p ${REMOTE_DIR}"

# 3. �ϴ�ѹ������Զ�̷�����
scp -P 22 $ZIP_NAME ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/

# 4. ��Զ�̷������Ͻ�ѹ��ɾ��ѹ����
ssh ${REMOTE_USER}@${REMOTE_HOST} "unzip -o ${REMOTE_DIR}/${ZIP_NAME} -d ${REMOTE_DIR}"
ssh ${REMOTE_USER}@${REMOTE_HOST} "rm ${REMOTE_DIR}/${ZIP_NAME}"

# 5. ɾ��������ʱѹ����
Remove-Item $ZIP_NAME -Force

# �����
if ($LASTEXITCODE -eq 0) {
    Write-Output "����ɹ���"
} else {
    Write-Output "����ʧ�ܣ�"
}