export interface UseCase<UseCaseInputDto, UseCaseOutputDto> {
    execute(input : UseCaseInputDto) : Promise<UseCaseOutputDto>
}