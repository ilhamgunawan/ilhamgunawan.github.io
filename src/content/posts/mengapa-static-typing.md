---
slug: mengapa-static-typing
title: Mengapa Static Typing Pada JavaScript?
date: 2022-01-02
author: ilhammrg
status: draft
tags:
  - article
---
Frontend development khususnya platform web tidak jauh dari JavaScript. Karena aplikasi web berjalan pada browser dimana JavaScript sebagai bahasa pemrogramannya. Menulis program dengan JavaScript cenderung lebih "mudah" dibanding scripting lainnya, salah satunya karena pada dasarnya tidak ada type checking.

Kelebihannya, saat menulis program akan lebih cepat dan fleksibel. Variabel pada JavaScript bisa kita isi dengan apa saja sesuai keinginan. Kita bisa customize program sesuai keinginan dengan fleksibel.

Misal: 

```
let x = "hello world"; // typeof x => string
x = 1; // typeof x => number
```

Contoh di atas bisa berjalan dengan baik tanpa menimbulkan error, sangat fleksibel.

Kekurangannya, bugs akan muncul jika kita tidak melakukan validasi terhadap type data.

Misal:

```
const sum = (a, b) => a + b;
sum(1, 2); // output => 3
sum(1, "2"); // output => "12"
```

Dari contoh fungsi `sum(a, b)` , output menjadi tidak sesuai jika tidak ada validasi untuk argumen a dan b.

Kita bisa refactor fungsi sum menjadi:

```
const sum = (a, b) => {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else {
    throw new Error("a and b must be valid number");
  }
};

sum(1, 2); // output => 3

sum("1", 2);
Uncaught Error: a and b must be valid number
    at sum (<anonymous>:5:11)
    at <anonymous>:1:1
```

Sekarang fungsi `sum(a, b)` menjadi lebih aman, namun masih ada kemungkinan terjadinya runtime error. Untuk menghindari dan meminimalisir runtime error yang terjadi, kita bisa gunakan static type checking terhadap kode JavaScript.

### TypeScript

TypeScript menjadi solusi yang paling umum digunakan saat ini. Penggunaan nya mudah diadopsi oleh programmer JavaScript karena syntax yang digunakan secara umum adalah syntax JavaScript. TypeScript menawarkan solusi `type` dan `interface.`

Kita coba ubah fungsi sum sebelumnya ke dalam solusi TypeScript:

```
const sum = (a: number, b: number): number => a + b;
sum(3, 4); // output => 7
sum("3", 4) // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Pada saat proses compile, TypeScript akan menampilkan error sehingga mencegah terjadinya runtime error. Kunjungi [](https://www.typescriptlang.org/)[dokumentasi](https://www.typescriptlang.org/) nya untuk lebih lanjut.

### Flow

Flow juga menawarkan solusi yang mirip dengan TypeScript. Type annotation nya pun hampir sama dengan TypeScript. Berikut contoh fungsi sum dengan Flow:

```
/* @flow */

const sum = (a: number, b: number): number => a + b;
sum(3, 4); // output => 7
sum("3", 4) // Cannot call `sum` with `"3"` bound to `a` because string [1] is incompatible with number [2].
```

Lihat [dokumentasinya](https://flow.org/en/) jika tertarik.

### ReasonML

Reason agak berbeda dengan kedua solusi sebelumnya. Syntax yang digunakan diadopsi dari OCaml, bahasa yang sudah digunakan industri lebih dari 20 tahun. Kode Reason akan dicompile ke JavaScript dengan bantuan BuckleScript (sekarang menjadi ReScript). Reason dikenal "kejam" karena compilernya yang sangat strict.

Berikut fungsi sum pada Reason:

```
let sum = (a, b) => a + b;
Js.log(sum(3, 4));
Js.log(sum("3", 4));

We've found a bug for you!
OCaml preview 3:21-52

This has type:
  string
But somewhere wanted:
  int
```

Reason akan mengetahui fungsi `sum(a, b)` menerima argumen `int` dan menghasilkan output `int`. Solusi lain dari Reason diantaranya adalah `Type`, `Variant`, `Record`, dan masih banyak lagi. Tertarik menggunakan Reason? Langsung saja eksplorasi di [dokumentasinya](https://reasonml.github.io/en/).

Ketiga solusi di atas memiliki keunikan dan kelebihan masing-masing. Perlahan kita bisa terapkan ke dalam projek yang sedang kita garap. Tidak ada salahnya bukan mencegah bugs lebih awal?