const levels = [
    {
        stages: [
            {
                stage: 0,
                task: "Найдите всех кошек:",
                items: ["cat-1", "cat-2", "cat-3", "cat-4"],
            },
            {
                stage: 1,
                task: "Найдите всех собак:",
                items: ["dog-1", "dog-2", "dog-3", "dog-4"],
            },
            {
                stage: 2,
                task: "Найдите всех пингвинов:",
                items: ["pinguin-1", "pinguin-2", "pinguin-3", "pinguin-4"],
            },
        ],
    },
    {
        task: "Найдите животным дом:",
        locations: [
            {
                locationSrc: "antarctica.png",
                animals: ["bear-1.png", "bear-2.png", "bear-3.png"],
            },
            {
                locationSrc: "aquarium.png",
                animals: ["fish-1.png", "fish-2.png", "fish-3.png"],
            },
            {
                locationSrc: "beach.png",
                animals: ["crab-1.png", "crab-2.png", "crab-3.png"],
            },
            {
                locationSrc: "birdhouse.png",
                animals: ["bird-1.png", "bird-2.png", "bird-3.png"],
            },
            {
                locationSrc: "desert.png",
                animals: ["camel-1.png", "camel-2.png", "camel-3.png"],
            },
            {
                locationSrc: "river.png",
                animals: [
                    "crocodile-1.png",
                    "crocodile-2.png",
                    "crocodile-3.png",
                ],
            },
        ],
    },
    {
        task: "Поместите все однокоренные слова в контейнер:",
        wordsSets: [
            {
                correctWords: [
                    "Разум",
                    "Разумение",
                    "Неразумный",
                    "Разумность",
                    "Разумный",
                ],
                fakeWords: ["Скала", "Вешалка", "Скрепка", "Лес", "Стена"],
            },
            {
                correctWords: [
                    "Попутный",
                    "Запутать",
                    "Беспутный",
                    "Путь",
                    "Путник",
                ],
                fakeWords: ["Якорь", "Кошка", "Перо", "Телефон", "Розетка"],
            },
            {
                correctWords: [
                    "Любовь",
                    "Любить",
                    "Любовник",
                    "Любимец",
                    "Любимый",
                ],
                fakeWords: ["Мышка", "Монитор", "Буква", "Алфавит", "Энергия"],
            },
        ],
    },
];
