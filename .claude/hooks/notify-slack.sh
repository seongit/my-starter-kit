#!/bin/bash
# Claude Code Hook → Slack 알림 스크립트
# 권한 요청, 작업 완료 시 Slack으로 알림 전송

# .env 파일에서 SLACK_WEBHOOK_URL 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../../.env"

if [ -f "$ENV_FILE" ]; then
  WEBHOOK_URL=$(grep -E '^SLACK_WEBHOOK_URL=' "$ENV_FILE" | cut -d'=' -f2-)
fi

# 웹훅 URL 미설정 시 조용히 종료
if [ -z "$WEBHOOK_URL" ]; then
  exit 0
fi

INPUT=$(cat)
EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // "unknown"')
CWD=$(echo "$INPUT" | jq -r '.cwd // "unknown"')
PROJECT=$(basename "$CWD")

# 이벤트별 메시지 구성
case "$EVENT" in
  "Notification")
    EMOJI=":bell:"
    TITLE="권한 요청 대기 중"
    DETAIL="Claude Code가 권한 승인을 기다리고 있습니다."
    ;;
  "Stop")
    EMOJI=":white_check_mark:"
    TITLE="작업 완료"
    DETAIL="Claude Code가 응답을 완료했습니다."
    ;;
  *)
    EMOJI=":information_source:"
    TITLE="$EVENT"
    DETAIL="이벤트 발생"
    ;;
esac

# Slack 메시지 전송 (백그라운드로 실행하여 Claude Code 블로킹 방지)
curl -s -X POST "$WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  -d "$(jq -n \
    --arg emoji "$EMOJI" \
    --arg title "$TITLE" \
    --arg detail "$DETAIL" \
    --arg project "$PROJECT" \
    '{
      text: ($emoji + " " + $title),
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: ($emoji + " *" + $title + "*\n" + $detail + "\n:file_folder: `" + $project + "`")
          }
        }
      ]
    }')" > /dev/null 2>&1 &

exit 0
