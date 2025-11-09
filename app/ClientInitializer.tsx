// // app/ClientInitializer.tsx

// 'use client'; // Эта директива делает компонент клиентским

// import { useEffect } from 'react';
// import { initLightboxJS } from 'lightbox.js-react';

// // Этот компонент не будет ничего отображать.
// // Его единственная цель - запустить useEffect в браузере.
// export default function ClientInitializer() {
//   useEffect(() => {
//     // Инициализируем библиотеку с вашим ключом
//     initLightboxJS("F64F-4934-51B8-1B2F", "individual");
//   }, []);

//   // Компонент должен что-то возвращать, null - идеальный вариант
//   return null;
// }