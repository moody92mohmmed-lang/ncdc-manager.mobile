تطبيق المدير للهاتف — NCDC مع Firebase Cloud Messaging

هذه النسخة مربوطة بمشروع Firebase:
ncdc-mali

الملفات المهمة:
- index.html: تطبيق المدير للهاتف.
- manifest.json: يجعل الموقع قابلًا للتثبيت على الهاتف.
- firebase-messaging-sw.js: Service Worker للإشعارات الكاملة.
- functions/index.js: Cloud Function ترسل إشعارًا للمدير عند إضافة أو تحديث بريد في collection mails.

طريقة رفع تطبيق الهاتف على GitHub Pages:
1) ارفع الملفات إلى Repository جديد مثل: ncdc-manager-mobile
2) من Settings > Pages اختر:
   Source: Deploy from a branch
   Branch: main
   Folder: /root
3) افتح رابط التطبيق من الهاتف وثبّته من Add to Home Screen.
4) افتح التطبيق، ادخل كلمة مرور المدير، واضغط زر الجرس 🔔 لتفعيل الإشعارات.

مهم جدًا للإشعارات وهي مغلقة:
الإشعار الكامل لا يعمل بمجرد وضع VAPID Key فقط. يجب أيضًا نشر Cloud Functions الموجودة في مجلد functions.

أسهل طريقة بدون تثبيت على جهازك:
1) افتح Google Cloud Shell من داخل Firebase/Google Cloud.
2) ارفع هذا المشروع أو استنسخه من GitHub.
3) نفذ:
   npm install -g firebase-tools
   firebase login --no-localhost
   firebase deploy --only functions

بعد نشر Functions، أي بريد جديد أو تحديث من منصة اللابتوب سيرسل إشعارًا للهاتف المسجل.

ملاحظة:
إذا بقي الرابط مختلفًا عن:
https://moody92mohmmed-lang.github.io/ncdc-manager-mobile/
افتح functions/index.js وعدّل قيمة webpush.fcmOptions.link إلى رابط تطبيق الهاتف الصحيح.
