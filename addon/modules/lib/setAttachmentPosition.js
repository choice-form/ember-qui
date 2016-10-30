/**
 * Created by cform on 16/10/31.
 */

function setAttachmentPosition() {
  const row = document.getElementsByClassName('row')[0];
  const header = row.getElementsByTagName('header')[0];
  const attachment = row.getElementsByClassName('attachment')[0];
  attachment.remove();
  row.insertBefore(attachment, header);
}

export default setAttachmentPosition;
