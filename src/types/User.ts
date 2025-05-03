export interface CreateUserDto {
    name: string;
    email: string;
}

export interface UserResponseDto extends CreateUserDto {
    id: string;
}
