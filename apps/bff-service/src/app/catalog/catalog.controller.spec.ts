import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { CatalogModel } from './models/catalog.model';
import { ClientModel } from '../client/models/client.model';
import { DeleteCatalogDto } from './dto/delete-catalog.dto';
import { CatalogDto } from './dto/catalog.dto';
import { ClientDto } from '../client/dto/client.dto';
import { NotFoundException } from '@nestjs/common';

describe('CatalogController', () => {
    let controller: CatalogController;
    let service: CatalogService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CatalogController],
            providers: [
                CatalogService,
                {
                    provide: getModelToken(ClientModel.name),
                    useValue: ClientModel,
                },
                {
                    provide: getModelToken(CatalogModel.name),
                    useValue: CatalogModel,
                },
            ],
        })
            .overrideProvider(ClientModel)
            .useValue(ClientModel)
            .compile();

        controller = module.get<CatalogController>(CatalogController);
        service = module.get<CatalogService>(CatalogService);
    });

    describe('createCatalog', () => {
        it('should create a new catalog', async () => {
            const createCatalogDto = {
                clientId: '1',
                name: 'New Catalog Name',
                vertical: 'home',
                isPrimary: false,
            };
            const mockClient = {
                id: '1',
                email: 'test@example.com',
                catalogs: [
                    {
                        id: '2',
                        name: 'Existing Catalog Name',
                        vertical: 'home',
                        isPrimary: false,
                    },
                ],
            };
            jest.spyOn(service, 'createCatalog').mockResolvedValue(mockClient);

            const result = await controller.createCatalog(createCatalogDto);

            expect(result).toEqual(mockClient);
        });
    });

    describe('deleteCatalog', () => {
        it('should delete catalogs from client', async () => {
            const mockClient = {
                id: '1',
                email: 'test@example.com',
                catalogs: [
                    {
                        id: '2',
                        name: 'Catalog 1',
                        vertical: 'home',
                        isPrimary: true,
                    },
                    {
                        id: '3',
                        name: 'Catalog 2',
                        vertical: 'general',
                        isPrimary: false,
                    },
                    {
                        id: '4',
                        name: 'Catalog 3',
                        vertical: 'fashion',
                        isPrimary: false,
                    },
                ],
            };

            const deleteCatalogDto: DeleteCatalogDto = {
                clientId: '1',
                catalogIds: ['1', '3'],
            };

            jest.spyOn(service, 'deleteCatalogs').mockResolvedValue(mockClient);

            const result = await controller.deleteCatalog(deleteCatalogDto);

            expect(result).toEqual(mockClient);
        });
    });

    describe('editCatalog', () => {
        const mockEditCatalogDto: CatalogDto = {
            clientId: '1',
            id: '2',
            name: 'New Name',
            vertical: 'general',
            isPrimary: true,
        };

        const mockClient: ClientDto = {
            id: '1',
            email: 'test@example.com',
            catalogs: [{ id: '2', name: 'New Name', vertical: 'general', isPrimary: true }],
        };

        it('should update the catalog and return the updated client', async () => {
            jest.spyOn(service, 'updateCatalog').mockResolvedValue(mockClient);

            const result = await controller.editCatalog(mockEditCatalogDto);

            expect(service.updateCatalog).toHaveBeenCalledWith(mockEditCatalogDto);
            expect(result).toEqual(mockClient);
        });

        it('should throw NotFoundException if catalog does not exist', async () => {
            jest.spyOn(service, 'updateCatalog').mockRejectedValue(new NotFoundException());

            await expect(controller.editCatalog(mockEditCatalogDto)).rejects.toThrow(NotFoundException);
        });

        it('should make the edited catalog the primary one if isPrimary is true', async () => {
            const mockCatalogs = [
                { id: '111', name: 'New Name', vertical: 'general', isPrimary: false },
                { id: '222', name: 'New Name 1', vertical: 'fashion', isPrimary: true },
                { id: '333', name: 'New Name 1', vertical: 'home', isPrimary: false },
            ];

            const mockClientWithCatalogs: ClientDto = {
                id: '1',
                email: 'test@example.com',
                catalogs: mockCatalogs,
            };

            const mockEditCatalogDtoWithPrimary: CatalogDto = {
                ...mockEditCatalogDto,
                isPrimary: true,
            };

            const expectedUpdatedCatalogs = [
                { id: '111', name: 'New Name', vertical: 'general', isPrimary: false },
                { id: '222', name: 'New Name 1', vertical: 'fashion', isPrimary: false },
                { id: '333', name: 'New Name 1', vertical: 'home', isPrimary: false },
                { id: '2', name: 'New Name', vertical: 'general', isPrimary: true },
            ];

            const expectedUpdatedClient: ClientDto = {
                ...mockClientWithCatalogs,
                catalogs: expectedUpdatedCatalogs,
            };

            jest.spyOn(service, 'updateCatalog').mockResolvedValue(expectedUpdatedClient);

            const result = await controller.editCatalog(mockEditCatalogDtoWithPrimary);

            expect(service.updateCatalog).toHaveBeenCalledWith(mockEditCatalogDtoWithPrimary);
            expect(result).toEqual(expectedUpdatedClient);
        });
    });
});
