// // // function greet(name: string): string {
// // //   return "Hello " + name;
// // // }

// // // const res = greet("ajmat");
// // // const res2 = greet(20);
// // // console.log(res, res2);

// // // ================ Type ================

// // // type ResumeStatus = "draft" | "analyzing" | "optimized" | "final";

// // // function printStatus(status: ResumeStatus) {
// // //   console.log(`current status ${status}`);
// // // }

// // // printStatus("draft");
// // // printStatus("archived");

// // // type AnalysisResult =
// // //   | { success: true; score: number }
// // //   | { success: false; error: string };

// // // const handleResult = (result: AnalysisResult) => {
// // //   if (result.success) {
// // //     console.log(result.score);
// // //   } else {
// // //     console.log(result.error);
// // //   }
// // // };

// // // handleResult({ success: true, score: 94 });

// // // ===

// // // type EMailLogin = { email: string; password: string };
// // // type PhoneLogin = { phone: string; otp: string };

// // // function login(credential: EMailLogin | PhoneLogin) {
// // //   console.log(credential.email);
// // // }

// // type PaymentResult =
// //   | { success: true; orderId: string }
// //   | { success: false; reason: string };

// // const paymentStatus = (result: PaymentResult) => {
// //   if (result.success) {
// //     console.log("Payment successful!");
// //   } else {
// //     console.log("result is failed"!);
// //   }
// // };

// // paymentStatus({ success: true, orderId: "vbjiUYT&*Ijhbuy8" });
// // paymentStatus({ success: false, reason: "Network Error" });

// // =================== Array =================

// // function getFirstFruits(fruits: string[]): string {
// //   if (fruits.length > 0) {
// //     return fruits[0]!; <<<<<<<--------------
// //   }
// //   return "NO fruits found";
// // }

// // const res = getFirstFruits(["Apple", "orange"]);
// // console.log(res);

// // function getLast<T>(items: T[]) {
// //   return items[items.length - 1];
// // }

// // const lastFruit = getLast(["apple", "Banana", "Orange"]);

// // const lastNum = getLast([1, 2, 3]);

// // console.log(lastFruit.toUpperCase());
// // // console.log(lastNum.toUpperrCase());

// // ==================================== Partial, Omit and Pick Tool =====================

// // type User = {
// //   id: string;
// //   name: string;
// //   email: string;
// //   password: string;
// // };

// // ============= Partial

// // type updateUserInput = Partial<User>;

// // const u1: updateUserInput = { name: "Ajmat" };
// // const u2: updateUserInput = {};

// // ============= Omit

// // type PublicUser = Omit<User, "password">;

// // const safeUser: PublicUser = {
// //   id: "dghkjn",
// //   name: "Ajmat",
// //   email: "ajmat@gmail.com",
// // };

// // console.log(safeUser);

// // ============= Pick

// // type userCredential = Pick<User, "email" | "password">;

// // const u1: userCredential = { email: "ajmat@gmail.com", password: "fvghjk" };

// // =========================== Interface =========================

// interface User {
//   id: string;
//   name: string;
// }

// const x: User = { name: "AJmat ali", id: "-09876tfvbj*IUH" };
// console.log(x);

// // =========================== any vs Unknown =========================

// // const val1: any = "Ajmat";
// // val1.toUpperCase();

// // const val2: unknown = "ali";
// // if (typeof val2 === "string") {
// //   val2.toUpperCase();
// // }

// // console.log(val1);
// // console.log(val2);

// // function processApiResponse(response: unknown) {
// //   if (typeof response === "string") {
// //     console.log(response.toUpperCase());
// //   }
// // }

// // =========================== enum =========================

// // enum ResumeStatus {
// //   draft,
// //   analyzing,
// //   optimized,
// //   final,
// // }

// // let sts: ResumeStatus = ResumeStatus.analyzing;

// // console.log("==> ", sts);

// // type role = "user" | "admin";

// // let r1: role = "user";

// // console.log(r1);

// import { z } from "zod";

// const res = z.number();

// let x = res.parse("30");

// console.log(x);
