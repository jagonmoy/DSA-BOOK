class UserDto {
    constructor(user) {
        const userDto = JSON.parse(JSON.stringify(user));
        this.name = userDto.name;
        this.username = userDto.username;
        this.email = userDto.email;
        this.createdAt = userDto.createdAt;
        this.updatedAt = userDto.updatedAt;
    }
}

module.exports = {UserDto}