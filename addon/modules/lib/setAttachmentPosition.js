/**
 * Created by cform on 16/10/31.
 */

function setAttachmentPosition(refchild) {
  const row = document.getElementsByClassName('row')[0];
  const header = row.getElementsByTagName('header')[0];
  header.remove();
  row.insertBefore(header, refchild);
}

export default setAttachmentPosition;
