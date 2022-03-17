export const mockMap = `map: 0001□□□□□□
0112□□□□□□
01□□□□□□□□
01□□□□□□□□
01□□□□□□□□
01□□□□□□□□
012□□□□□□□
00111113□□
00000001□□
00000001□□`;

export const mockMapArray: string[][] = mockMap.split('map:')[1].trim().split('\n').map((s) => s.split(''));
