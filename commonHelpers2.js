import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as r}from"./assets/vendor-77e16229.js";const t={form:document.querySelector(".form"),inputDelay:document.querySelector('[name="delay"]'),inputFulfilled:document.querySelector('[value="fulfilled"]'),inputRejected:document.querySelector('[value="rejected"]')};t.form.addEventListener("submit",s);function s(i){i.preventDefault();const o=t.inputDelay.value;new Promise((e,n)=>{setTimeout(()=>{t.inputFulfilled.checked?e(o):n(o)},o)}).then(e=>r.show({message:`✅ Fulfilled promise in ${e}ms`,position:"topCenter",backgroundColor:"#59A10D",messageColor:"#FFFFFF"})).catch(e=>r.show({message:`❌ Rejected promise in ${e}ms`,position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"}))}
//# sourceMappingURL=commonHelpers2.js.map
